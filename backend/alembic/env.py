# filepath: /workspaces/roseCityRoll/backend/alembic/env.py
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, create_engine
from sqlalchemy import pool
from alembic import context
from app.models import Base  # Import your Base
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

# Get the database URL from the environment variable or use a default value
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:@localhost:5432/postgres")
# Replace asyncpg with psycopg2 for synchronous connection
SYNC_DATABASE_URL = DATABASE_URL.replace("postgresql+asyncpg", "postgresql+psycopg2")
config.set_main_option("sqlalchemy.url", SYNC_DATABASE_URL)

# add your model's MetaData object here
# for 'autogenerate' support
target_metadata = Base.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = create_engine(
        config.get_main_option("sqlalchemy.url"),
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()