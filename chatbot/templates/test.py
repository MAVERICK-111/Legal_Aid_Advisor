import requests

ELEVEN_LABS_API_KEY = "YOUR_CORRECT_API_KEY"

def check_api():
    url = "https://api.elevenlabs.io/v1/user"
    headers = {"xi-api-key": ELEVEN_LABS_API_KEY}

    response = requests.get(url, headers=headers)
    print("Status Code:", response.status_code)
    print("Response:", response.json())

check_api()
