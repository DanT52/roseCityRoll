FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Run Alembic migrations
RUN alembic upgrade head

# Command to run the application
CMD ["python", "main.py"]