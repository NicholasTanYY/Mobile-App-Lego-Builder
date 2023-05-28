import cv2
import numpy as np
import os
import glob

# Create a dictionary for color names and their BGR values
colors = {
    "Black": (29, 19, 5),
    "Blue": (191, 85, 0),
    "Green": (65, 120, 35),
    "Dark-Turquoise": (155, 143, 0),
    "Red": (9, 26, 201),
    "Dark-Pink": (160, 112, 200),
    "Brown": (39, 57, 88),
    "Light-Gray": (157, 161, 155),
    "Dark-Gray": (92, 110, 109),
    "Light-Blue": (227, 210, 180),
    "Bright-Green": (74, 159, 75),
    "Light-Turquoise": (175, 165, 85),
    "Salmon": (94, 112, 242),
    "Pink": (172, 151, 252),
    "Yellow": (55, 205, 242),
    "White": (255, 255, 255),
    "Light-Green": (184, 218, 194),
    "Light-Yellow": (150, 230, 251),
    "Tan": (158, 205, 228),
    "Light-Violet": (226, 202, 201),
    "Glow-In-Dark-Opaque": (201, 213, 212),
    "Purple": (123, 0, 129),
    "Dark-Blue-Violet": (176, 50, 32),
    "Orange": (24, 138, 254),
    "Magenta": (120, 57, 146),
    "Lime": (11, 233, 187),
    "Dark-Tan": (115, 138, 149),
    "Bright-Pink": (200, 173, 228),
    "Medium-Lavender": (186, 120, 172),
    "Lavender": (237, 213, 225),
    "Trans-Black-IR-Lens": (82, 95, 99),
    "Trans-Dark-Blue": (160, 32, 0),
    "Trans-Green": (141, 182, 132),
    "Trans-Bright-Green": (167, 228, 217),
    "Trans-Red": (9, 26, 201),
    "Trans-Black": (82, 95, 99),
    "Trans-Light-Blue": (236, 239, 174),
    "Trans-Neon-Green": (132, 241, 248),
    "Trans-Very-Lt-Blue": (240, 223, 193),
    "Trans-Dark-Pink": (149, 102, 223),
    "Trans-Yellow": (47, 205, 245),
    "Trans-Clear": (252, 252, 252),
    "Trans-Purple": (203, 165, 165),
    "Trans-Neon-Yellow": (0, 176, 218),
    "Trans-Neon-Orange": (13, 128, 255),
    "Chrome-Antique-Brass": (76, 90, 100),
    "Chrome-Blue": (191, 150, 108),
    "Chrome-Green": (113, 179, 60),
    "Chrome-Pink": (142, 77, 170),
    "Chrome-Black": (52, 42, 27),
    "Very-Light-Orange": (155, 207, 243),
    "Light-Purple": (152, 98, 205),
    "Reddish-Brown": (18, 42, 88),
    "Light-Bluish-Gray": (169, 165, 160),
    "Dark-Bluish-Gray": (104, 110, 108),
    "Medium-Blue": (219, 147, 90),
    "Medium-Green": (161, 220, 115),
    "Speckle-Black-Copper": (0, 0, 0),
    "Speckle-DBGray-Silver": (97, 95, 99),
    "Light-Pink": (207, 204, 254),
    "Light-Flesh": (179, 215, 246),
    "Milky-White": (255, 255, 255),
    "Metallic-Silver": (180, 169, 165),
    "Metallic-Green": (95, 155, 137),
    "Metallic-Gold": (52, 172, 219),
    "Medium-Dark-Flesh": (42, 112, 204),
    "Dark-Purple": (145, 54, 63),
    "Dark-Flesh": (58, 80, 124),
    "Royal-Blue": (219, 97, 76),
    "Flesh": (104, 145, 208),
    "Light-Salmon": (189, 186, 254),
    "Violet": (163, 84, 67),
    "Blue-Violet": (202, 116, 104),
    "Glitter-Trans-Dark-Pink": (149, 102, 223),
    "Medium-Lime": (60, 210, 199),
    "Glitter-Trans-Clear": (255, 255, 255),
    "Aqua": (209, 215, 179),
    "Light-Lime": (167, 228, 217),
    "Light-Orange": (97, 186, 249),
    "Glitter-Trans-Purple": (203, 165, 165),
    "Speckle-Black-Silver": (0, 0, 0),
    "Speckle-Black-Gold": (0, 0, 0),
    "Copper": (89, 122, 174),
    "Pearl-Light-Gray": (168, 163, 156),
    "Metal-Blue": (161, 136, 121),
    "Pearl-Light-Gold": (129, 188, 220),
    "Trans-Medium-Blue": (247, 226, 207),
    "Pearl-Dark-Gray": (87, 88, 87),
    "Pearl-Very-Light-Gray": (172, 173, 171),
    "Very-Light-Bluish-Gray": (224, 227, 230),
    "Yellowish-Green": (165, 238, 223),
    "Flat-Dark-Gold": (85, 132, 180),
    "Flat-Silver": (136, 135, 137),
    "Trans-Orange": (28, 143, 240),
    "Pearl-White": (242, 243, 242),
    "Bright-Light-Orange": (61, 187, 248),
    "Bright-Light-Blue": (233, 195, 159),
    "Rust": (4, 16, 179),
    "Bright-Light-Yellow": (58, 240, 255),
    "Trans-Pink": (200, 173, 228),
    "Sky-Blue": (221, 191, 125),
    "Trans-Light-Purple": (159, 112, 150),
    "Dark-Blue": (99, 52, 10),
    "Dark-Green": (50, 70, 24),
    "Glow-In-Dark-Trans": (173, 198, 189),
    "Pearl-Gold": (46, 127, 170),
    "Dark-Brown": (0, 33, 53),
    "Maersk-Blue": (195, 146, 53),
    "Dark-Red": (15, 14, 114),
    "Dark-Azure": (201, 139, 7),
    "Medium-Azure": (191, 174, 54),
    "Light-Aqua": (192, 195, 173),
    "Olive-Green": (90, 154, 155),
    "Chrome-Gold": (61, 165, 187),
    "Sand-Red": (114, 117, 214),
    "Medium-Dark-Pink": (177, 133, 247),
    "Earth-Orange": (28, 156, 250),
    "Sand-Purple": (132, 94, 132),
    "Sand-Green": (172, 188, 160),
    "Sand-Blue": (161, 116, 96),
    "Chrome-Silver": (224, 224, 224),
    "Fabuland-Brown": (80, 123, 182),
    "Medium-Orange": (11, 167, 255),
    "Dark-Orange": (0, 85, 169),
    "Very-Light-Gray": (218, 227, 230),
    "Glow-in-Dark-White": (217, 217, 217),
    "Medium-Violet": (228, 145, 147),
    "Glitter-Trans-Neon-Green": (0, 245, 192),
    "Glitter-Trans-Light-Blue": (197, 188, 104),
    "Trans-Flame-Yellowish-Orange": (109, 183, 252),
    "Trans-Fire-Yellow": (144, 232, 251),
    "Trans-Light-Royal-Blue": (247, 212, 180),
    "Reddish-Lilac": (151, 85, 142),
}

# Function to colorize an image
def colorize_image(image, color):
    # Normalize the grayscale image to 0-1 range
    image = image.astype(float) / 255
    color_image = cv2.merge([image * color[0], image * color[1], image * color[2]])
    return (color_image * 255).astype(np.uint8)

# Get all images in the grayscale directory
image_paths = glob.glob('working_dataset/grayscale/*.png')

# Iterate over all images
for image_path in image_paths:
    # Load the image
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # load as grayscale

    # Ensure the image is a grayscale image
    assert len(image.shape) == 2

    # For each color, colorize the image and save it in the appropriate directory
    for color_name, color_value in colors.items():
        # Normalize BGR values to 0-1 range
        color_value = (color_value[0]/255, color_value[1]/255, color_value[2]/255)

        color_image = colorize_image(image, color_value)

        # Ensure the color directory exists
        color_dir = f'working_dataset/{color_name}'
        os.makedirs(color_dir, exist_ok=True)

        # Save the image
        filename = os.path.basename(image_path)
        cv2.imwrite(f'{color_dir}/{filename}', color_image)
