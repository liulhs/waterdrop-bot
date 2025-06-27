from pipecat.adapters.schemas.function_schema import FunctionSchema
from pipecat.adapters.schemas.tools_schema import ToolsSchema
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from pipecat.services.openai.llm import OpenAILLMService
from pipecat.processors.aggregators.openai_llm_context import OpenAILLMContext
from prompts import DEFAULT_SYSTEM_PROMPT

load_dotenv(override=True)

# Define the retriever function using the standard schema
retriever_function = FunctionSchema(
    name="search_knowledge_base",
    description="Search the Qdrant knowledge base for relevant documents based on a query",
    properties={
        "query": {
            "type": "string",
            "description": "The search query to find relevant documents, e.g. 'WD-A1 leaking at the bottom'",
        },
    },
    required=["query"]
)

# Create a tools schema with your retriever function
retriever_tools = ToolsSchema(standard_tools=[retriever_function])

def load_qdrant_from_disk(persist_path: str, collection_name: str) -> QdrantVectorStore:
    """
    Loads the Qdrant vector store from disk and returns a QdrantVectorStore instance.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables.")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

    client = QdrantClient(path=persist_path)
    return QdrantVectorStore(
        client=client,
        collection_name=collection_name,
        embedding=embeddings,
    )

TOOL_CONTEXT = OpenAILLMContext(
    messages=[{"role": "system", "content": DEFAULT_SYSTEM_PROMPT}],
    tools=retriever_tools
)

LLM_WITH_TOOLS = OpenAILLMService(api_key=os.getenv("OPENAI_API_KEY"))
