import { auth } from '../firebase';

// Firm, static approach. No dynamic guessing. 
// Uses your Render URL when deployed, and local URL when developing.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = {
  async get(endpoint) {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to make API requests.");
    }

    // Securely retrieve the JWT Token from Firebase
    const token = await user.getIdToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'API request failed');
    }

    return response.json();
  },
  
  async post(endpoint, data) {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to make API requests.");
    }

    const token = await user.getIdToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'API request failed');
    }

    return response.json();
  }
};
