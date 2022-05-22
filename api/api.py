from flask import Flask, request, json
from flask_cors import CORS
import requests
import base64
from PIL import Image
import numpy as np
from constants import *
import tensorflow as tf
import tensorflow_text as text
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
def generate_text_score():
    request_data = json.loads(request.data)
    sentence = tf.constant([request_data['text']])
    prediction = tf.sigmoid(nlp_model(sentence))
    prediction = max(prediction, 0)
    return {'score': str(round(prediction.numpy()[0][0], 2))} # 0 is sad 1 is happy

@app.route('/api/scoreVideo', methods=['POST'])
def generate_video_score():
    global video_scores
    request_data = json.loads(request.data)
    video_url = request_data['url']
    text = request_data['transcript']

    video = cv2.VideoCapture(video_url)
    
    sentence = tf.constant([text])
    text_prediction = tf.sigmoid(nlp_model(sentence))
    text_score = max(text_prediction.numpy()[0][0], 0)

    while True:
        ret, frame = video.read()

    # image_data = re.sub('^data:image/.+;base64,', '', request_data['image_data'])
    # imgdata = base64.b64decode(image_data)
    # image = Image.open(io.BytesIO(imgdata))
    # image = np.array(image)
        if frame is not None:
            obj = DeepFace.analyze(frame, actions = ['emotion'], models={'emotion': emotion_model}, enforce_detection=False, detector_backend='ssd')
            box = obj['region']

            # Not being used
            emotion = obj['dominant_emotion']
            confidence = obj['emotion'][emotion]
            
            adjusted_scores = [emotion_labels[feeling] * obj['emotion'][feeling] / 100 for feeling in emotion_labels]
            score = sum(adjusted_scores)
            video_scores.append(score)
        else:
            break
    
    video_score = sum(video_scores) / len(video_scores)
    video_score = max(video_score, 0)

    video_scores = []

    return {"score": str(round(video_score + text_score, 2))}