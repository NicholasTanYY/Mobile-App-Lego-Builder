from ultralytics import YOLO

# Load a model
model = YOLO("yolov5s.pt")  # build a new model upon a pre-trained model

# Use the model
# model.train(data="config.yaml", lr0=0.001, lrf=0.0005, epochs=5, batch=8, workers=0, imgsz=640, plots=True)  # train the model
model.train(data="config.yaml", epochs=5, batch=8, workers=0, imgsz=640, plots=True)  # train the model