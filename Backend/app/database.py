import os
from pymongo import MongoClient, ReturnDocument
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

users_collection = db["users"]
agents_collection = db["agents"]
counter_collection = db["counters"]

def get_next_account_id():
    counter = counter_collection.find_one_and_update(
        {"_id": "accountId"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    return f"ACC{counter['seq']:04d}"
