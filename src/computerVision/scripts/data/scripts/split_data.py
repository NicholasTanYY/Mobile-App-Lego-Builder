# Split dataset into train, validation and test sets by the proportion of 0.7, 0.2, 0.1

import os
import shutil

# Set the path of the dataset
path = '../improved_dataset'

# Set the path of the train, validate and test sets
train_path = '../datasets/train'
validate_path = '../datasets/valid'
test_path = '../datasets/test'

def split_dataset(path, train_path, validate_path, test_path):
    
    test_path_images = os.path.join(test_path, "images")
    test_path_labels = os.path.join(test_path, "labels")
    validate_path_images = os.path.join(validate_path, "images")
    validate_path_labels = os.path.join(validate_path, "labels")
    train_path_images = os.path.join(train_path, "images")
    train_path_labels = os.path.join(train_path, "labels")

    # Create the train, validate and test sets
    img_count = 0
    multiple = 10
    for image in os.listdir(os.path.join(path, "images")):
        if img_count % multiple == 0:
            shutil.copy(os.path.join(path, "images", image), test_path_images)
        elif img_count % multiple == 1 or img_count % multiple == 2:
            shutil.copy(os.path.join(path, "images", image), validate_path_images)
        else:
            shutil.copy(os.path.join(path, "images", image), train_path_images)
        img_count += 1
    
    label_count = 0
    for label in os.listdir(os.path.join(path, "labels")):
        if label_count % multiple == 0:
            shutil.copy(os.path.join(path, "labels", label), test_path_labels)
        elif label_count % multiple == 1 or label_count % multiple == 2:
            shutil.copy(os.path.join(path, "labels", label), validate_path_labels)
        else:
            shutil.copy(os.path.join(path, "labels", label), train_path_labels)
        label_count += 1

split_dataset(path, train_path, validate_path, test_path)