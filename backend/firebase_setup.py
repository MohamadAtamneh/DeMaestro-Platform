import os
import firebase_admin
from firebase_admin import credentials, firestore

def initialize_firebase():
    if not firebase_admin._apps:
        # Load the service account key relative to this file
        # The key is expected to be at the root of the project: DeMaestro-Platform/serviceAccountKey.json
        cred_path = os.path.join(os.path.dirname(__file__), '..', 'serviceAccountKey.json')
        
        if not os.path.exists(cred_path):
            raise FileNotFoundError(f"Service account key not found at {cred_path}")
            
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)

    # Return the firestore client
    return firestore.client()
