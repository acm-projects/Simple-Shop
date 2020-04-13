#for extracting images
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
#opening extracted images
from PIL import Image
import requests
from io import BytesIO
#convertine image to text
import pytesseract
#storing data into json file
import json

#goes to where tesseract download is saved
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

#opens and stores webpage url with sizing chart
html = urlopen('https://www.railsclothing.com/pages/size-charts')
bs = BeautifulSoup(html, 'html.parser')
images = bs.find_all('img', {'src': re.compile('.jpg')})
for image in images:
    url = 'http:' + image['src'] #gets url of image
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)) #opens image
    text = pytesseract.image_to_string(img) #converts image into text
    with open('data.json', 'w') as f:
        json.dump(text, f) #stores into json file

