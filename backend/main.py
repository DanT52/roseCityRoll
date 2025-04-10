"""
This module runs the uvicorn server for the FastAPI application.
"""
import argparse
import uvicorn


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the FastAPI application with Uvicorn.")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload.")
    args = parser.parse_args()

    uvicorn.run("app.app:app", host="0.0.0.0", log_level="info", reload=args.reload, proxy_headers=True)
    