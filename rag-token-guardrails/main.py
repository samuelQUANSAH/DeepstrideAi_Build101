import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import api

# Setup structured logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("RAGTokenGuardrails")

app = FastAPI(
    title="RAG Token Guardrails API",
    description="A microservice to monitor prompt sizes, enforce budgets, cache queries, and route LLM intents.",
    version="1.0.0"
)

# Configure CORS for developer testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach API routes
app.include_router(api.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "RAG Token Guardrails",
        "endpoints": {
            "validate": "/api/validate (POST)",
            "approve": "/api/approve (POST)",
            "metrics": "/api/metrics (GET)"
        }
    }

@app.on_event("startup")
async def startup_event():
    logger.info("RAG Token Guardrails microservice initialization completed.")
