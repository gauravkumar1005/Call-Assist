from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

from app.models import SignupModel, LoginModel, AgentModel
from app.database import users_collection, agents_collection, get_next_account_id
from app.auth import hash_password, verify_password, create_token, get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def validate_object_id(agent_id: str):
    if not ObjectId.is_valid(agent_id):
        raise HTTPException(status_code=400, detail="Invalid agent id")
    return ObjectId(agent_id)

@app.post("/signup")
def signup(user: SignupModel):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    account_id = get_next_account_id()
    users_collection.insert_one({
        "accountId": account_id,
        "username": user.username,
        "password": hash_password(user.password)
    })
    return {"message": "Account created", "accountId": account_id}

@app.post("/login")
def login(user: LoginModel):
    db_user = users_collection.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({
        "accountId": db_user["accountId"],
        "username": db_user["username"]
    })
    return {"token": token, "username": db_user["username"]}

@app.post("/agents")
def create_agent(agent: AgentModel, user=Depends(get_current_user)):
    agents_collection.insert_one({
        "accountId": user["accountId"],
        **agent.dict()
    })
    return {"message": "Agent created"}

@app.get("/agents")
def get_agents(user=Depends(get_current_user)):
    agents = list(agents_collection.find({"accountId": user["accountId"]}))
    for a in agents:
        a["_id"] = str(a["_id"])
    return agents

@app.get("/agents/{agent_id}")
def get_agent(agent_id: str, user=Depends(get_current_user)):
    oid = validate_object_id(agent_id)
    agent = agents_collection.find_one({"_id": oid, "accountId": user["accountId"]})
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    agent["_id"] = str(agent["_id"])
    return agent

@app.put("/agents/{agent_id}")
def update_agent(agent_id: str, agent: AgentModel, user=Depends(get_current_user)):
    oid = validate_object_id(agent_id)
    result = agents_collection.update_one(
        {"_id": oid, "accountId": user["accountId"]},
        {"$set": agent.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"message": "Agent updated"}

@app.delete("/agents/{agent_id}")
def delete_agent(agent_id: str, user=Depends(get_current_user)):
    oid = validate_object_id(agent_id)
    result = agents_collection.delete_one({"_id": oid, "accountId": user["accountId"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"message": "Agent deleted"}
