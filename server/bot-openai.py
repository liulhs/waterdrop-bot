#
# Copyright (c) 2024–2025, Daily
#
# SPDX-License-Identifier: BSD 2-Clause License
#

"""OpenAI Bot Implementation.

This module implements a chatbot using OpenAI's GPT-4 model for natural language
processing. It includes:
- Real-time audio/video interaction through Daily
- Animated robot avatar
- Text-to-speech using ElevenLabs
- Support for both English and Spanish

The bot runs as part of a pipeline that processes audio/video frames and manages
the conversation flow.
"""

import asyncio
import os
import sys

import aiohttp
from dotenv import load_dotenv
from loguru import logger

from runner import configure
from pipecat.audio.vad.silero import SileroVADAnalyzer
from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.runner import PipelineRunner
from pipecat.pipeline.task import PipelineParams, PipelineTask
from pipecat.processors.frame_processor import FrameDirection, FrameProcessor
from pipecat.frames.frames import TTSSpeakFrame
from pipecat.processors.frameworks.rtvi import RTVIConfig, RTVIObserver, RTVIProcessor
from pipecat.services.cartesia.tts import CartesiaTTSService
from pipecat.services.elevenlabs.tts import ElevenLabsTTSService
from pipecat.transports.services.daily import DailyParams, DailyTransport, DailyTranscriptionSettings
from pipecat.transcriptions.language import Language
from pipecat.services.llm_service import FunctionCallParams
from tool import TOOL_CONTEXT, LLM_WITH_TOOLS, load_qdrant_from_disk

load_dotenv(override=True)
logger.remove(0)
logger.add(sys.stderr, level="DEBUG")


# Load vector store and perform search
vector_store = load_qdrant_from_disk("./waterdrop_faq_qdrant", "waterdrop_faq")
retriever = vector_store.as_retriever(k=4)


async def search_knowledge_base(params: FunctionCallParams):
    """
    Implementation of the search function that will be called when the LLM invokes the tool.
    
    Args:
        params: FunctionCallParams object containing arguments and result callback
        
    Returns:
        Results via params.result_callback()
    """
    try:
        # Extract arguments
        query = params.arguments.get("query")
        
        if not query:
            await params.result_callback({
                "error": "Query parameter is required"
            })
            return
        
        docs = retriever.invoke(query)
        
        # Format results
        results = []
        for i, doc in enumerate(docs):
            results.append({
                "rank": i + 1,
                "content": doc.page_content,
                "metadata": doc.metadata if hasattr(doc, 'metadata') else {}
            })
        
        # Return results via callback
        await params.result_callback({
            "query": query,
            "results": results,
            "total_results": len(results)
        })
        
    except Exception as e:
        # Handle errors
        await params.result_callback({
            "error": f"Failed to search knowledge base: {str(e)}"
        })


async def main():
    """Main bot execution function.

    Sets up and runs the bot pipeline including:
    - Daily video transport
    - Speech-to-text and text-to-speech services
    - Language model integration
    - RTVI event handling
    """
    async with aiohttp.ClientSession() as session:
        (room_url, token) = await configure(session)

        # Set up Daily transport with video/audio parameters
        transport = DailyTransport(
            room_url,
            token,
            "Chatbot",
            DailyParams(
                audio_in_enabled=True,
                audio_out_enabled=True,
                video_out_enabled=False,
                vad_analyzer=SileroVADAnalyzer(),
                transcription_enabled=True,
                transcription_settings=DailyTranscriptionSettings(
                    language="ja",
                ),
            ),
        )

        tts = CartesiaTTSService(
            api_key=os.getenv("CARTESIA_API_KEY"),
            voice_id="9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
            # voice_id="0cd0cde2-3b93-42b5-bcb9-f214a591aa29",
            params=CartesiaTTSService.InputParams(
                language=Language.JA,
                # speed="normal"
            )
        )


        # Initialize LLM service
        llm = LLM_WITH_TOOLS
        llm.register_function(
            "search_knowledge_base",
            search_knowledge_base,
        )

        @llm.event_handler("on_function_calls_started")
        async def on_function_calls_started(service, function_calls):
            await tts.queue_frame(TTSSpeakFrame("Let me check on that."))

        # Set up conversation context and management
        # The context_aggregator will automatically collect conversation context
        context_aggregator = llm.create_context_aggregator(TOOL_CONTEXT)

        #
        # RTVI events for Pipecat client UI
        #
        rtvi = RTVIProcessor(config=RTVIConfig(config=[]))

        pipeline = Pipeline(
            [
                transport.input(),
                rtvi,
                context_aggregator.user(),
                llm,
                tts,
                transport.output(),
                context_aggregator.assistant(),
            ]
        )

        task = PipelineTask(
            pipeline,
            params=PipelineParams(
                allow_interruptions=True,
                enable_metrics=True,
                enable_usage_metrics=True,
            ),
            observers=[RTVIObserver(rtvi)],
        )
        # Remove initial animation frame
        # await task.queue_frame(quiet_frame)

        # Flag to track if we've already handled client ready
        client_ready_handled = False

        @rtvi.event_handler("on_client_ready")
        async def on_client_ready(rtvi):
            nonlocal client_ready_handled
            if not client_ready_handled:
                client_ready_handled = True
                await rtvi.set_bot_ready()
                # Kick off the conversation only once
                await task.queue_frames([context_aggregator.user().get_context_frame()])

        @transport.event_handler("on_first_participant_joined")
        async def on_first_participant_joined(transport, participant):
            await transport.capture_participant_transcription(participant["id"])

        @transport.event_handler("on_participant_left")
        async def on_participant_left(transport, participant, reason):
            print(f"Participant left: {participant}")
            await task.cancel()

        runner = PipelineRunner()

        await runner.run(task)


if __name__ == "__main__":
    asyncio.run(main())
