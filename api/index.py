from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.projects import router as projects_router
import firebase_setup

# Initialize Firebase before the server starts accepting requests
firebase_setup.initialize_firebase()

app = FastAPI(title="DeMaestro Platform API")

# Setup CORS to allow your Vite frontend to connect
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the independent router files
app.include_router(projects_router, prefix="/api/projects", tags=["projects"])
