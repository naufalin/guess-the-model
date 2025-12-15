# Guess the Model

A full-stack web application built with Next.js, FastAPI, PostgreSQL, Redis, and Celery. This monorepo contains both frontend and backend services orchestrated with Docker Compose.

## 🏗️ Project Structure

```
guess-the-model/
├── frontend/          # Next.js application (TypeScript)
│   ├── src/
│   │   ├── app/      # Next.js app directory
│   │   └── lib/      # Utilities and API client
│   ├── public/       # Static assets
│   ├── Dockerfile
│   └── package.json
├── backend/           # FastAPI application (Python 3.11+)
│   ├── app/
│   │   ├── main.py           # FastAPI entry point
│   │   ├── config.py         # Configuration management
│   │   ├── database.py       # Database setup
│   │   ├── models/           # SQLAlchemy models
│   │   ├── routes/           # API routes
│   │   └── tasks/            # Celery tasks
│   ├── alembic/              # Database migrations
│   ├── pyproject.toml        # Python dependencies (uv)
│   └── Dockerfile
├── docker-compose.yml # Docker orchestration
├── .env.example       # Environment variables template
└── README.md
```

## 🚀 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit with async support
- **Alembic** - Database migration tool
- **Celery** - Distributed task queue
- **PostgreSQL** - Primary database
- **Redis** - Cache and message broker

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **PostgreSQL 16** - Database
- **Redis 7** - Cache and Celery broker

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)
- Git

For local development without Docker:
- Node.js 20+
- Python 3.11+
- PostgreSQL 16+
- Redis 7+
- uv (Python package manager)

## 🛠️ Setup Instructions

### Quick Start with Docker Compose

1. **Clone the repository:**
   ```bash
   git clone https://github.com/naufalin/guess-the-model.git
   cd guess-the-model
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install uv (if not already installed):**
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

3. **Create virtual environment and install dependencies:**
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -r pyproject.toml
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your local database credentials
   ```

5. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

6. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

7. **Start Celery worker (in a new terminal):**
   ```bash
   celery -A app.tasks.celery_app worker --loglevel=info
   ```

8. **Start Celery beat (in a new terminal):**
   ```bash
   celery -A app.tasks.celery_app beat --loglevel=info
   ```

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local if needed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the frontend:**
   Open http://localhost:3000 in your browser

## 🔌 API Endpoints

### Health Check
- `GET /health` - Main health check
- `GET /api/health` - API health check

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create a new background task
- `GET /api/tasks/{task_id}` - Get task status

### Example API Request

```bash
# Create a task
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"name": "My Task", "description": "Task description"}'

# Get task status
curl http://localhost:8000/api/tasks/{task_id}
```

## 🐳 Docker Services

The `docker-compose.yml` orchestrates the following services:

1. **frontend** - Next.js application (port 3000)
2. **backend** - FastAPI application (port 8000)
3. **postgres** - PostgreSQL database (port 5432)
4. **redis** - Redis cache and broker (port 6379)
5. **celery-worker** - Background task processor
6. **celery-beat** - Scheduled task scheduler

### Docker Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Rebuild services
docker-compose up --build

# Remove volumes (⚠️ deletes data)
docker-compose down -v
```

## ��️ Database Migrations

### Create a new migration

```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
```

### Apply migrations

```bash
alembic upgrade head
```

### Rollback migration

```bash
alembic downgrade -1
```

## 📦 Project Features

- ✅ Full-stack TypeScript/Python application
- ✅ RESTful API with FastAPI
- ✅ Async database operations with SQLAlchemy
- ✅ Background task processing with Celery
- ✅ Redis caching and message broker
- ✅ Docker containerization
- ✅ Hot reload for development
- ✅ Database migrations with Alembic
- ✅ CORS configuration
- ✅ Health check endpoints
- ✅ API documentation (Swagger/OpenAPI)

## 🧪 Development Workflow

1. Make changes to code
2. Changes are automatically reloaded (hot reload enabled)
3. Test your changes
4. Create database migrations if needed
5. Commit your changes

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available environment variables:

- **Database**: `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- **Redis**: `REDIS_URL`
- **Celery**: `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND`
- **Frontend**: `NEXT_PUBLIC_API_URL`
- **Backend**: `DEBUG`

### Port Configuration

Default ports:
- Frontend: 3000
- Backend: 8000
- PostgreSQL: 5432
- Redis: 6379

To change ports, modify the `docker-compose.yml` file.

## 📝 License

This is a hobby project for learning purposes.

## 🤝 Contributing

This is a personal hobby project, but suggestions and improvements are welcome!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.
