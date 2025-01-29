"""
Script to create, delete, or show users.
"""
import asyncio
import sys
from create_user import create_user, delete_user, show_users

def get_args():
    if len(sys.argv) == 2 and sys.argv[1] == "-show":
        return "show", None, None
    elif len(sys.argv) == 3 and sys.argv[1] == "-delete":
        return "delete", sys.argv[2], None
    elif len(sys.argv) == 3:
        return "create", sys.argv[1], sys.argv[2]
    return "create", "test@email.com", "test"

if __name__ == "__main__":
    action, username, password = get_args()
    if action == "create":
        asyncio.run(create_user(username, password))
    elif action == "delete":
        asyncio.run(delete_user(username))
    elif action == "show":
        asyncio.run(show_users())
