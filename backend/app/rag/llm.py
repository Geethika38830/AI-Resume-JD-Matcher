
import os

import requests

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434/api/generate")
MODEL_NAME = os.getenv("OLLAMA_MODEL", "gemma3:4b")


def generate_response(prompt: str, llm=None) -> str:
    if not prompt or not prompt.strip():
        return ""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
                "keep_alive": "10m",
                "options": {
                    "num_predict": 256,
                    "temperature": 0.2,
                },
            },
            timeout=180,
        )

        response.raise_for_status()
        result = response.json().get("response", "")
        return result.strip() or "No response generated."

    except requests.exceptions.Timeout:
        return "Local LLM generation failed: request timed out."

    except requests.exceptions.RequestException as exc:
        return f"Local LLM generation failed: {exc}"
