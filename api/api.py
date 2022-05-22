from flask import Flask, request, json
from flask_cors import CORS
import requests
import base64
from PIL import Image
import numpy as np
from constants import *
import tensorflow as tf
import io
import re
from deepface import DeepFace
import cv2

app = Flask(__name__)
CORS(app)

nlp_model = tf.saved_model.load(NLP_MODEL_PATH)

emotion_model = DeepFace.build_model('Emotion')
emotion_labels = {'angry': -1, 'disgust': -1, 'fear': -1, 'happy': 1, 'sad': -1, 'surprise': 0, 'neutral': 0}

video_scores = []

headers = {
    'authorization': ASSEMBLYAI_API_KEY, 
    'content-type': 'application/json',
}

@app.route('/api/scoreText', methods=['POST'])
def generate_health_score(text):
    request_data = json.loads(request.data)
    sentence = tf.constant(request_data['text'])
    prediction = nlp_model(sentence)
    return prediction # 0 is sad 1 is happy

@app.route('/api/scoreVideo', methods=['POST'])
def generate_video_score(image):
    global video_scores
    request_data = json.loads(request.data)
    video_url = request_data['url']

    video = cv2.VideoCapture(video_url)

    while True:
        ret, frame = video.read()

    # image_data = re.sub('^data:image/.+;base64,', '', request_data['image_data'])
    # imgdata = base64.b64decode(image_data)
    # image = Image.open(io.BytesIO(imgdata))
    # image = np.array(image)
        obj = DeepFace.analyze(frame, actions = ['emotion'], models={'emotion': emotion_model}, enforce_detection=False, detector_backend='ssd')
        box = obj['region']
        emotion = obj['dominant_emotion']
        confidence = obj['emotion'][emotion]
        adjusted_scores = [emotion_labels[feeling] * obj['emotion'][feeling] / 100 for feeling in emotion_labels]
        score = sum(adjusted_scores)
        video_scores.append(score)
    
    video_score = video_scores / len(video_scores)

    video_scores = []

    return video_score

@app.route('/api/scoreAudio', methods=['POST'])
def generate_audio_score(audio):

    # NOT SURE HOW THIS WORKS WITH AUDIO MAYBE JUST RECEIVE DATA AND DO THE WHILE TRUE
    file = '/path/to/your/audio/file.mp3'
    
    upload_link = 'https://api.assemblyai.com/v2/upload'

    def read_audio_file(file):
        """Helper method that reads in audio files"""
        with open(file, 'rb') as f:
            while True:
                data = f.read(5242880)
                if not data:
                    break
                yield data

    res_upload = requests.post(
        upload_link, 
        headers=headers, 
        data=read_audio_file(file)
    )

    upload_url = res_upload.json()['upload_url']

    transcript_link = 'https://api.assemblyai.com/v2/transcript'

    response = requests.post(
        transcript_link,
        headers=headers,
        json={
            'audio_url': upload_url,
            'sentiment_analysis': True
        }, 
    )
    
    response_json = response.json()

    print(response_json)