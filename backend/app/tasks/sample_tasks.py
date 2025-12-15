"""Sample Celery tasks."""
import time
from app.tasks.celery_app import celery_app


@celery_app.task(name="app.tasks.sample_task")
def sample_task(task_name: str):
    """Sample background task that simulates processing."""
    print(f"Processing task: {task_name}")
    
    # Simulate some work
    time.sleep(5)
    
    result = f"Task '{task_name}' completed successfully!"
    print(result)
    
    return result


@celery_app.task(name="app.tasks.scheduled_task")
def scheduled_task():
    """Sample scheduled task for Celery Beat."""
    print("Running scheduled task...")
    return "Scheduled task completed"
