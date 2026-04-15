import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def initialize_firebase():
    if not firebase_admin._apps:
        # Check for Vercel Environment Variable first
        creds_json = os.environ.get('FIREBASE_CREDENTIALS_JSON')
        
        if creds_json:
            # Parse the JSON string from the environment variable securely injected by Vercel
            creds_dict = json.loads(creds_json)
            cred = credentials.Certificate(creds_dict)
            firebase_admin.initialize_app(cred)
        else:
            # Fallback for Local Development
            cred_path = os.path.join(os.path.dirname(__file__), '..', 'serviceAccountKey.json')
            if not os.path.exists(cred_path):
                raise FileNotFoundError(f"Service account key not found! Please set FIREBASE_CREDENTIALS_JSON environment variable or ensure serviceAccountKey.json is safely at root.")
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)

    # Return the firestore client
    return firestore.client()
