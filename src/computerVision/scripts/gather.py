import cv2
import numpy as np
import os

main_dir = '../data/pre-processed_data/working_dataset'
save_dir = '../data/pre-processed_data/combined_dataset'
counter = 0

# Combine all files from the working_dataset directory into the combined_dataset directory
for folder in os.listdir(main_dir):
    for file in os.listdir(os.path.join(main_dir, folder)):
        
        # Append the name of the folder to the back of the file name
        new_file_name = file.split('.')[0] + '_' + folder + '.png'

        # Move the file to the combined_dataset directory
        os.rename(os.path.join(main_dir, folder, file), os.path.join(save_dir, new_file_name))
