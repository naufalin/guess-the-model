"""Application configuration."""

import os
from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""

    # App settings
    app_name: str = "Guess the Model API"
    debug: bool = False

    # Database settings
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://postgres:postgres@postgres:5432/guessthemodel",
    )

    # Redis settings
    redis_url: str = os.getenv("REDIS_URL", "redis://redis:6379/0")

    # Celery settings
    celery_broker_url: str = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
    celery_result_backend: str = os.getenv(
        "CELERY_RESULT_BACKEND", "redis://redis:6379/0"
    )

    # CORS settings
    cors_origins: list = [
        "http://localhost:3000",
        "http://frontend:3000",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
