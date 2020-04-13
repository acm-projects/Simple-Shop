#to go through webpages
from bs4 import BeautifulSoup
import requests

#url of website's home page
url = "https://www.coggles.com/"

# Getting the webpage, creating a Response object.
response = requests.get(url)

# Extracting the source code of the page.
data = response.text

# Passing the source code to BeautifulSoup to create a BeautifulSoup object for it.
soup = BeautifulSoup(data, 'html.parser')

# Extracting all the <a> tags into a list.
tags = soup.find_all('a')

for points in tags:
    point = str(points.text)
    if point.find('Size Guide') != -1:
       print(url + points.get('href'))
       print(point)

for points in tags:
    point = str(points.text)
    if point.find('Size Chart') != -1:
        print(points.get('href'))
        print(point)

for points in tags:
    point = str(points.text)
    if point.find('Size guide') != -1:
        print(url + points.get('href'))
        print(point)

#https://www.aeropostale.com/
#https://www.coggles.com/
#https://www.peacocks.co.uk/


