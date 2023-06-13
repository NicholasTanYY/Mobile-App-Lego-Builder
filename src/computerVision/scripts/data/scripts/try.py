from ultralytics import YOLO
import cv2

# Load a model
model = YOLO("../models/M3.pt")  # using an existing model

# Bring up the webcam
model.predict(source="0", show=True)