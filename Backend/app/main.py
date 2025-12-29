from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from bson import ObjectId
from datetime import datetime

from app.models import (
    SignupModel,
    AgentModel,
    InteractionCreateModel,
)
from app.database import (
    users_collection,
    agents_collection,
    interactions_collection,
    get_next_account_id,
)
from app.auth import (
    hash_password,
    verify_password,
    create_token,
    get_current_user,
)

# ===================== APP =====================
app = FastAPI(title="Call Assist API", version="1.0.0")

# ===================== CORS =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== OAUTH SCHEME =====================
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ===================== HELPERS =====================
def validate_object_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    return ObjectId(id)


# ===================== AUTH-FREE ACCOUNT RESOLVER =====================
# Used by Pipecat / system APIs
def get_account_from_header(x_account_id: str = Header(...)):
    return {"accountId": x_account_id}


# ===================== AUTH =====================
@app.post("/signup")
def signup(user: SignupModel):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    account_id = get_next_account_id()

    users_collection.insert_one({
        "accountId": account_id,
        "username": user.username,
        "password": hash_password(user.password),
        "createdAt": datetime.utcnow(),
    })

    return {
        "message": "Account created successfully",
        "accountId": account_id,
    }


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db_user = users_collection.find_one({"username": form_data.username})

    if not db_user or not verify_password(form_data.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({
        "accountId": db_user["accountId"],
        "username": db_user["username"],

    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "accountId": db_user["accountId"],

    }


# ===================== AGENTS =====================

# 🔐 CREATE AGENT (AUTH REQUIRED)
@app.post("/agents")
def create_agent(agent: AgentModel, user=Depends(get_current_user)):
    agents_collection.insert_one({
        "accountId": user["accountId"],
        **agent.dict(),
        "createdAt": datetime.utcnow(),
    })
    return {"message": "Agent created successfully"}


# 🔓 GET ALL AGENTS (AUTH FREE)
@app.get("/agents")
def get_agents(ctx=Depends(get_account_from_header)):
    agents = list(
        agents_collection.find({"accountId": ctx["accountId"]})
    )

    for a in agents:
        a["_id"] = str(a["_id"])

    return agents


# 🔓 GET SINGLE AGENT (AUTH FREE)
@app.get("/agents/{agent_id}")
def get_agent(agent_id: str, ctx=Depends(get_account_from_header)):
    oid = validate_object_id(agent_id)

    agent = agents_collection.find_one({
        "_id": oid,
        "accountId": ctx["accountId"],
    })

    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    agent["_id"] = str(agent["_id"])
    return agent


# 🔐 UPDATE AGENT (AUTH REQUIRED)
@app.put("/agents/{agent_id}")
def update_agent(agent_id: str, agent: AgentModel, user=Depends(get_current_user)):
    oid = validate_object_id(agent_id)

    result = agents_collection.update_one(
        {"_id": oid, "accountId": user["accountId"]},
        {"$set": agent.dict()}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")

    return {"message": "Agent updated successfully"}


# 🔐 DELETE AGENT (AUTH REQUIRED)
@app.delete("/agents/{agent_id}")
def delete_agent(agent_id: str, user=Depends(get_current_user)):
    oid = validate_object_id(agent_id)

    result = agents_collection.delete_one({
        "_id": oid,
        "accountId": user["accountId"],
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")

    return {"message": "Agent deleted successfully"}


# ===================== INTERACTIONS =====================

# 🔓 CREATE INTERACTION (AUTH FREE – PIPECAT SAFE)
@app.post("/interactions")
def create_interaction(
    interaction: InteractionCreateModel,
    ctx=Depends(get_account_from_header),
):
    agent_oid = validate_object_id(interaction.agentId)

    agent = agents_collection.find_one({
        "_id": agent_oid,
        "accountId": ctx["accountId"],
    })

    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    interactions_collection.insert_one({
        "accountId": ctx["accountId"],
        "agentId": agent_oid,
        "interactionType": interaction.interactionType,
        "startTime": interaction.startTime,
        "endTime": interaction.endTime,
        "duration": interaction.duration,
        "summary": interaction.summary,
        "status": interaction.status,
        "createdAt": datetime.utcnow(),
    })

    return {"message": "Interaction stored successfully"}


# 🔓 GET AGENT INTERACTIONS (AUTH FREE)
@app.get("/agents/{agent_id}/interactions")
def get_agent_interactions(agent_id: str, ctx=Depends(get_account_from_header)):
    agent_oid = validate_object_id(agent_id)

    interactions = list(
        interactions_collection.find({
            "agentId": agent_oid,
            "accountId": ctx["accountId"],
        }).sort("createdAt", -1)
    )

    for i in interactions:
        i["_id"] = str(i["_id"])
        i["agentId"] = str(i["agentId"])

    return interactions
