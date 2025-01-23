"""
This module runs the uvicorn server for the FastAPI application.
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.app:app", host="0.0.0.0", log_level="info", reload=True)
    