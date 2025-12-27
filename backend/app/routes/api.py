"""API endpoints."""


from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel

from app.tasks.sample_tasks import sample_task

router = APIRouter()


class TaskCreate(BaseModel):
    """Task creation model."""

    name: str
    description: str | None = None


class TaskResponse(BaseModel):
    """Task response model."""

    task_id: str
    name: str
    status: str


@router.get("/health")
async def api_health():
    """API health check."""
    return {"status": "healthy", "service": "api"}


@router.get("/tasks")
async def list_tasks():
    """List all tasks."""
    return {
        "tasks": [
            {"id": "1", "name": "Sample Task", "status": "completed"},
            {"id": "2", "name": "Another Task", "status": "pending"},
        ]
    }


@router.post("/tasks")
async def create_task(task: TaskCreate, background_tasks: BackgroundTasks):
    """Create a new background task."""
    # Trigger Celery task
    celery_task = sample_task.delay(task.name)

    return TaskResponse(task_id=celery_task.id, name=task.name, status="queued")


@router.get("/tasks/{task_id}")
async def get_task(task_id: str):
    """Get task status."""
    from app.tasks.celery_app import celery_app

    result = celery_app.AsyncResult(task_id)

    return {
        "task_id": task_id,
        "status": result.status,
        "result": result.result if result.ready() else None,
    }
