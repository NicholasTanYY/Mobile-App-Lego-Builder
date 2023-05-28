import os
import cv2
import numpy as np
import random
from PIL import Image

# Numbers to identify lego bricks
config =  ['6632', '3022', '3062', '3068', '2357', '3045', '3010', '6143', '33909', '3023', '4150', 
           '3024', '3037', '3020', '3298', '3069', '18654', '3002', '3004', '3623', '43857', '3070', 
           '4274', '41677', '2420', '4490', '3039', '41678', '27925', '99301', '3040', '3005', '3659', 
           '3063', '3001', '3003', '3046', '2780', '43093', '85984', '3794', '4286', '3675', '54200', 
           '3038', '14719', '3700', '3622', '15672', '3021']

# Main dataset directory
main_dir = 'working_dataset'

# Directory to save generated images
save_dir = 'training/datasets/coco128/'
os.makedirs(save_dir, exist_ok=True)

# Directory where background images are stored
bg_dir = 'backgrounds/'

# Load the background images
bg_images = [cv2.imread(os.path.join(bg_dir, file)) for file in os.listdir(bg_dir) if file.endswith('.jpg')]
print(f'Loaded {len(bg_images)} background images')

# Counter to name the generated images
counter = 1

def augment_image(bg_img, lego_img):
    # Randomly decide on the scale of the lego image
    scale_factor = random.uniform(0.1, 0.5)  # adjust as needed

    new_size = (int(lego_img.shape[1] * scale_factor), int(lego_img.shape[0] * scale_factor))

    # Resize the lego image
    lego_img = cv2.resize(lego_img, new_size)

    # Create an empty list to store bounding boxes
    bounding_boxes = []

    # Randomly decide the position of the lego on the background
    position = (random.randint(0, bg_img.shape[1]-lego_img.shape[1]),
                random.randint(0, bg_img.shape[0]-lego_img.shape[0]))

    # Extract the alpha channel from the lego image and create a mask
    mask = cv2.cvtColor(lego_img, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(mask, 1, 255, cv2.THRESH_BINARY)

    # Ensure mask is 3 channels
    mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
    mask = mask.astype(float)/255

    # lego_img.shape[0] = height, lego_img.shape[1] = width
    # position[0] = x, position[1] = y
    # Replace the region in the background with the lego image
    bg_img[position[1]:position[1]+lego_img.shape[0], position[0]:position[0]+lego_img.shape[1]] = \
        mask * lego_img[:, :, :3] + (1 - mask) * bg_img[position[1]:position[1]+lego_img.shape[0], position[0]:position[0]+lego_img.shape[1]]
    if bg_img is None:
        print(f'Failed to load image at {os.path.join(bg_dir, file)}')

    # Append the bounding box coordinates to the list
    # bounding_boxes.append((position[0], position[1], position[0]+lego_img.shape[1], position[1]+lego_img.shape[0]))

    # bg_img.shape[0] = height, bg_img.shape[1] = width
    # Append the bounding box coordinates to the list in the yolo format
    bounding_boxes.append([(position[0]+(lego_img.shape[1])//2)/bg_img.shape[1], 
                           (position[1]+(lego_img.shape[0])//2)/bg_img.shape[0], 
                           lego_img.shape[1]/bg_img.shape[1],  
                           lego_img.shape[0]/bg_img.shape[0]])
    return bg_img, bounding_boxes

# Traverse each colour sub-directory
while counter <= 50000:
    for root, dirs, files in os.walk(main_dir):
        if files:
            # Decide on a random number of legos to place in the image
            num_legos = random.randint(1, 5)

            # Randomly select the lego images
            lego_images = random.sample(files, num_legos)

            # Randomly select a background image
            bg_img = random.choice(bg_images).copy()

            # Create a list to collect bounding boxes from all legos in one image
            all_bounding_boxes = []
            # lego_colors = []
            lego_names = []

            for file in lego_images:
                # Load the lego brick image
                lego_img_path = os.path.join(root, file)
                lego_img = cv2.imread(lego_img_path, cv2.IMREAD_UNCHANGED)

                # # Get the color from the parent directory name
                # lego_color = os.path.basename(os.path.dirname(lego_img_path))
                # lego_colors.append(lego_color)

                # # Extract the lego name from the file name, excluding the file extension
                # lego_name = os.path.splitext(file)[0]

                # # Replace spaces in the lego name with underscores
                # lego_name = lego_name.replace(' ', '_')
                # lego_names.append(lego_name)

                # Extract the lego name (number) from the file name
                lego_name = file.split(' ')[0]

                # Check if the lego name is in the config
                if lego_name not in config:
                    exit()
                
                lego_names.append(lego_name)

                # Augment the image
                bg_img, bounding_boxes = augment_image(bg_img, lego_img)

                # Collect the bounding boxes
                all_bounding_boxes.extend(bounding_boxes)

            # Save the new image and its bounding boxes
            cv2.imwrite(os.path.join(save_dir, f'images/train{counter}.jpg'), bg_img)
            with open(os.path.join(save_dir, f'labels/train{counter}.txt'), 'w') as f:
                idx = 0
                for box in all_bounding_boxes:
                    f.write(f"{config.index(lego_names[idx])} {box[0]} {box[1]} {box[2]} {box[3]}\n")
                    idx += 1

            # Increment the counter
            counter += 1
            print(f'Generated {counter} images')
