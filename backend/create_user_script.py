"""
Script to create a user.
"""
import asyncio
import sys
from create_user import create_user

def get_args():
    """
    Retrieve command line arguments for username and password.
    Returns default values if not provided.
    """
    if len(sys.argv) == 3:
        return sys.argv[1], sys.argv[2]
    return "test@email.com", "test"

if __name__ == "__main__":
    username, password = get_args()
    asyncio.run(create_user(username, password))
