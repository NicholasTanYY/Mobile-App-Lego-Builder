import os

# original dataset directory
dir = '../original_dataset'

# Iterate over the files in the directory to get the label names (only the numbers)
label_names = set([file.split(' ')[0] for file in os.listdir(dir)])
print(label_names)
print(len(label_names))
