import os
from pymongo import MongoClient, ReturnDocument
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URI:
    raise RuntimeError("❌ MONGO_URI not found in .env")

if not DB_NAME:
    raise RuntimeError("❌ DB_NAME not found in .env")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

users_collection = db["users"]
agents_collection = db["agents"]
interactions_collection = db["interactions"]
counter_collection = db["counters"]

# ===================== INDEXES =====================
agents_collection.create_index("accountId")

interactions_collection.create_index([
    ("accountId", 1),
    ("agentId", 1),
    ("createdAt", -1),
])

# ===================== HELPERS =====================
def get_next_account_id():
    counter = counter_collection.find_one_and_update(
        {"_id": "accountId"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return f"ACC{counter['seq']:04d}"
