import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables (e.g., OPENROUTER_API_KEY from .env)
load_dotenv()

# Initialize OpenRouter client mapping using the official OpenAI library
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def analyze_requirements(user_input: str) -> str:
    """
    Analyzes the user requirements using google/gemini-1.5-pro model via OpenRouter.
    """
    response = client.chat.completions.create(
        model="google/gemini-1.5-pro",
        messages=[
            {"role": "system", "content": "You are an expert product manager. Analyze the user requirements and provide a concise structural breakdown."},
            {"role": "user", "content": user_input}
        ]
    )
    return response.choices[0].message.content

def generate_blueprint(requirements: str) -> str:
    """
    Generates a system architecture blueprint using openai/gpt-4o model via OpenRouter based on requirements.
    """
    response = client.chat.completions.create(
        model="openai/gpt-4o",
        messages=[
            {"role": "system", "content": "You are a senior system architect. Generate a technical architecture blueprint from the provided requirements."},
            {"role": "user", "content": requirements}
        ]
    )
    return response.choices[0].message.content

def generate_code(blueprint: str) -> str:
    """
    Generates Python code implementations from a blueprint using anthropic/claude-3.5-sonnet model via OpenRouter.
    """
    response = client.chat.completions.create(
        model="anthropic/claude-3.5-sonnet",
        messages=[
            {"role": "system", "content": "You are a senior software developer. You write modular, clean, and exact code corresponding to the given blueprint without any extraneous formatting unless requested."},
            {"role": "user", "content": blueprint}
        ]
    )
    return response.choices[0].message.content
