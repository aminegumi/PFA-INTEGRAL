import os

def remove_null_bytes(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()

    cleaned_content = content.replace(b'\x00', b'')

    with open(file_path, 'wb') as f:
        f.write(cleaned_content)

file_path = 'C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python312\\Lib\\importlib\\__init__.py'
remove_null_bytes(file_path)