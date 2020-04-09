import pytesseract
from PIL import Image
import json

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

img = Image.open('image8.jpg')
text = pytesseract.image_to_string(img)
print(text)

with open('data.json', 'w') as f:
    json.dump(text, f)