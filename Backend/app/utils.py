from database import counter_collection

def get_next_account_id():
    counter = counter_collection.find_one_and_update(
        {"_id": "accountId"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True
    )
    return counter["seq"]
