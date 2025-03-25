import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load API Key from .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# # List available models
# models = genai.list_models()
# for model in models:
#     # print(model.name)

import os
print(os.getenv("ELEVEN_LABS_API_KEY"))
