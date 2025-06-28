from pydantic import BaseModel
from typing import List, Any


class TTSModel(BaseModel):
    provider: str = "cartesia"
    language: str = "en"
    model: str = "cartesia"
    voice: str = "9626c31c-bec5-4cca-baa8-f8ba9e84c8bc"


class LLMModel(BaseModel):
    provider: str
    model: str
    customer: str
    system_prompt: str


class VADParams(BaseModel):
    start_secs: float = 0.2
    stop_secs: float = 0.8
    confidence: float = 0.7
    min_volume: float = 0.6


class StartBotRequest(BaseModel):
    app_id: str | None = None
    room_url: str | None = None
    token: str | None = None
    language: str = "en"
    tts_model: TTSModel
    llm_model: LLMModel
    vad_params: VADParams
    chat_id: str | None = None
    open_statement: bool | str = True
    template: str | None = None
    llm_url: str | None = None


class Option(BaseModel):
    name: str
    value: Any


class ServiceConfig(BaseModel):
    service: str
    options: List[Option]


class ServicesMapping(BaseModel):
    llm: str
    tts: str
    stt: str


class CallSettings(BaseModel):
    config: List[ServiceConfig]
    services: ServicesMapping


class AWSKey(BaseModel):
    aws_access_key_id: str
    aws_secret_access_key: str
