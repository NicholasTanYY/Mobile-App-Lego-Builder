import os

def check_label_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            values = line.strip().split()
            if len(values) != 5:
                print(f'Error in {file_path}, line {i}: each line must contain 5 values.')
                return False
            cls, x, y, w, h = values
            if not(0 <= float(x) <= 1) or not(0 <= float(y) <= 1) or not(0 <= float(w) <= 1) or not(0 <= float(h) <= 1):
                print(f'Error in {file_path}, line {i}: x_center, y_center, width, and height must be normalized between 0 and 1.')
                return False
            if int(cls) < 0:
                print(f'Error in {file_path}, line {i}: class label must be non-negative.')
                return False
    return True

def check_label_directory(directory_path):
    files = os.listdir(directory_path)
    txt_files = [f for f in files if f.endswith('.txt')]
    for txt_file in txt_files:
        file_path = os.path.join(directory_path, txt_file)
        if not check_label_file(file_path):
            print(f'Error found in {txt_file}, stopping...')
            break
    else:
        print('All label files are correctly formatted.')

# replace with your directory containing label txt files
check_label_directory('../datasets/labels')
