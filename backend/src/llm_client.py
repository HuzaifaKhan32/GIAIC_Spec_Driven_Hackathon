import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class GeminiClient:
    def __init__(self, model_name="gemini-1.5-flash"):
        if not GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel(model_name)

    def generate_content(self, prompt: str, temperature: float = 0.7, max_output_tokens: int = 1024):
        """
        Generates content from the Gemini model based on the given prompt.
        """
        generation_config = {
            "temperature": temperature,
            "max_output_tokens": max_output_tokens,
        }
        try:
            response = self.model.generate_content(
                prompt,
                generation_config=generation_config
            )
            return response.text
        except Exception as e:
            print(f"Error generating content with Gemini: {e}")
            return None

# Example usage (for testing purposes)
if __name__ == "__main__":
    # Ensure .env is configured with GEMINI_API_KEY
    gemini_client = GeminiClient()
    test_prompt = "What is the capital of France?"
    print(f"Sending prompt to Gemini: {test_prompt}")
    response = gemini_client.generate_content(test_prompt)
    if response:
        print(f"Gemini's response: {response}")
