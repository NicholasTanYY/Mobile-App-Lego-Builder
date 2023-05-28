# Trimming down the number of images in the original grayscale dataset
# by 100 times to make it easier to work with for the purposes of this project.
import os
import shutil

# Define source and destination directories
source_dir = 'original_dataset'
destination_dir = 'working_dataset/grayscale'

# Get a list of all filenames in the source directory
filenames = os.listdir(source_dir)

# Loop over the list of filenames with an index
for i, filename in enumerate(filenames):
    # For every 100th file
    if i % 100 == 0:
        # Define the full file paths
        source_file = os.path.join(source_dir, filename)
        destination_file = os.path.join(destination_dir, filename)
        
        # Copy the file to the destination directory
        shutil.copy(source_file, destination_file)

print("Finished copying files.")
