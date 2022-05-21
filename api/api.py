from flask import Flask, request, json
from flask_cors import CORS
import requests
import base64
from PIL import Image
import numpy as np
from constants import *
import tensorflow as tf

app = Flask(__name__)
CORS(app)

nlp_model = tf.saved_model.load(NLP_MODEL_PATH)

@app.route('/api/scoreText', methods=['POST'])
def generate_health_score(text):
    sentence = tf.constant(text)
    prediction = nlp_model(sentence)
    return prediction