import google.generativeai as genai
from dotenv import find_dotenv, load_dotenv
import os
import requests
import pygame
from flask import Flask, render_template, request

load_dotenv(find_dotenv())
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
ELEVEN_LABS_API_KEY = os.getenv("ELEVEN_LABS_API_KEY")

def play_audio(file_path):
    pygame.init()
    pygame.mixer.init()
    
    pygame.mixer.music.load(file_path)
    pygame.mixer.music.play()

    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)  

    pygame.mixer.music.stop()
    pygame.mixer.quit()

def get_voice_message(message):
    audio_file = "audio.mp3"

    if os.path.exists(audio_file):
        try:
            os.remove(audio_file)
        except Exception as e:
            print(f"Warning: Could not delete old audio file: {str(e)}")

    payload = {
        "text": message,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0
        }
    }

    headers = {
        "accept": "audio/mpeg",
        "xi-api-key": ELEVEN_LABS_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(
        "https://api.elevenlabs.io/v1/text-to-speech/1qEiC6qsybMkmnNdVMbK",
        json=payload,
        headers=headers
    )

    if response.status_code == 200 and response.content:
        with open(audio_file, "wb") as f:
            f.write(response.content)
        
        play_audio(audio_file)  # Play after writing
        return response.content
    else:
        print(f"Error fetching audio: {response.status_code} - {response.text}")
        return None

def get_response_from_ai(human_input, history=""):
    template = f"""
    You are a legal advisor working according to Indian Laws, help people. be short an upto the point
    {history}
    You: {human_input}
    Assistant:
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")  
        response = model.generate_content(template)
        
        return response.text if hasattr(response, "text") else response.candidates[0].content

    except Exception as e:
        return f"Error: {str(e)}"

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send_message", methods=["POST"])
def send_message():
    human_input = request.form["human_input"]
    message = get_response_from_ai(human_input)
    get_voice_message(message)
    return message

if __name__ == "__main__":
    app.run(debug=True)

