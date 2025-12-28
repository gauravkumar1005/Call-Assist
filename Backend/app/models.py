from pydantic import BaseModel

class SignupModel(BaseModel):
    username: str
    password: str

class LoginModel(BaseModel):
    username: str
    password: str

class AgentModel(BaseModel):
    agentType: str
    prompt: str
    kb: str
    guardrail: str
    voice: str
    lang: str
