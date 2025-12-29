from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ===================== AUTH MODELS =====================
class SignupModel(BaseModel):
    username: str
    password: str


class LoginModel(BaseModel):
    username: str
    password: str


# ===================== AGENT MODEL =====================
class AgentModel(BaseModel):
    agentType: str
    prompt: str
    kb: str
    guardrail: str
    voice: str
    lang: str


# ===================== INTERACTION MODELS =====================

class InteractionCreateModel(BaseModel):
    agentId: str                 # Mongo ObjectId (string)
    interactionType: str         # call | chat | voice

    startTime: datetime
    endTime: Optional[datetime] = None

    duration: Optional[int] = None
    summary: Optional[str] = None

    status: str = "completed"    # completed | failed


class InteractionDBModel(InteractionCreateModel):
    accountId: str
    createdAt: datetime
