# Server Documentation

This directory contains the server-side components for the Waterdrop AI Assistant. Below is a description of each Python module and its purpose.

## Core Modules

### `server.py`
**Main FastAPI Application**
- Handles HTTP requests and manages the bot lifecycle
- Provides endpoints for:
  - Direct browser access to the bot
  - RTVI client connections
  - Bot process management
- Manages Daily.co room creation and token generation
- Handles bot process monitoring and cleanup
- Configuration via environment variables

### `bot-openai.py`
**OpenAI Bot Implementation**
- Implements the core chatbot functionality using OpenAI's GPT-4 model
- Features:
  - Real-time audio/video interaction through Daily.co
  - Animated robot avatar
  - Text-to-speech using ElevenLabs
  - Bilingual support (English and Spanish)
- Manages conversation flow and state
- Integrates with the knowledge base for product support

### `tool.py`
**Knowledge Base Integration**
- Manages the Qdrant vector store for document retrieval
- Implements the `search_knowledge_base` function for semantic search
- Handles document embeddings using OpenAI's API
- Provides context management for the LLM
- Configuration via environment variables

### `prompts.py`
**Prompt Templates**
- Contains system prompts and conversation templates
- Defines the bot's personality and response guidelines
- Includes specialized prompts for:
  - Customer service interactions
  - Troubleshooting flows
  - Multi-language support
  - Escalation procedures

### `runner.py`
**Bot Process Manager**
- Handles command-line interface for the bot
- Manages bot process lifecycle
- Provides utilities for room configuration
- Handles command-line arguments and environment setup

## Dependencies

Core dependencies are listed in `requirements.txt`:
- FastAPI
- OpenAI
- Qdrant
- LangChain
- Daily.co SDK
- Python 3.10+

## Environment Variables

Create a `.env` file with the following variables:
```
OPENAI_API_KEY=your_openai_key
DAILY_API_KEY=your_daily_key
ELEVENLABS_API_KEY=your_elevenlabs_key
QDRANT_PATH=./waterdrop_faq_qdrant
```

## Getting Started

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the server:
   ```bash
   python server.py
   ```

3. Access the bot:
   - Web interface: Visit `http://localhost:7860`

## Architecture

The server follows a modular architecture:

1. **API Layer** (`server.py`): Handles HTTP/WebSocket connections
2. **Bot Core** (`bot-openai.py`): Implements the conversation logic
3. **Knowledge Base** (`tool.py`): Manages document retrieval
4. **Configuration** (`.env`): Centralized configuration
5. **Assets** (`assets/`): Contains bot avatars and media files

## License

SPDX-License-Identifier: BSD 2-Clause License
