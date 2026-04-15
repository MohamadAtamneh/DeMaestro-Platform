from fastapi import APIRouter, Depends, HTTPException
from auth_middleware import get_current_user
import firebase_setup
from datetime import datetime, timezone

router = APIRouter()
db = firebase_setup.initialize_firebase()

@router.get("/")
async def get_my_projects(user_dict: dict = Depends(get_current_user)):
    # Safely extract the uid verified directly by Google's backend
    user_id = user_dict.get("uid")
    try:
        projects_ref = db.collection('projects')
        query = projects_ref.where('userId', '==', user_id).stream()

        projects = []
        for doc in query:
            project_data = doc.to_dict()
            project_data['id'] = doc.id
            projects.append(project_data)

        return {"projects": projects}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_project(project_data: dict, user_dict: dict = Depends(get_current_user)):
    user_id = user_dict.get("uid")
    try:
        # Securely overwrite/set the user assignment
        project_data["userId"] = user_id
        project_data["createdAt"] = datetime.now(timezone.utc)
        
        projects_ref = db.collection('projects')
        update_time, doc_ref = projects_ref.add(project_data)
        
        return {"id": doc_ref.id, "message": "Project created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
