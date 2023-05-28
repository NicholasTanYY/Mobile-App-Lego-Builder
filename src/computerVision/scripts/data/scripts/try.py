from ultralytics import YOLO
import cv2
# Load a model
# model = YOLO("yolov8n.pt")  # using an existing model
model = YOLO("model.pt")  # using an existing model

# # Bring up the webcam
model.predict(source="0", show=True)

# results = model('image1.jpeg')
# print(results)
# cv2.imshow('image', results.imgs[0])