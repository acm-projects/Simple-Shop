from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import re
import pandas as pd
import os
import lxml
import json

# launch url
url = "https://www.abercrombie.com/shop/CustomerService?textKey=HELP_SIZECHART&catalogId=10901&langId=-1&storeId=10051#!"

# create a new Firefox session
driver = webdriver.Chrome('/Users/nivethanarayanan/Downloads/chromedriver')
driver.implicitly_wait(30)
driver.get(url)

# Selenium hands the page source to Beautiful Soup
soup_level1 = BeautifulSoup(driver.page_source, 'lxml')

datalist = []

# Beautiful Soup grabs the HTML table on the page
table = soup_level1.find_all('table')[0]

# Giving the HTML table to pandas to put in a dataframe object
df = pd.read_html(str(table), header=0)

# Store the dataframe in a list
datalist.append(df[0])

# end the Selenium browser session
driver.quit()

# combine all pandas dataframes in the list into one big dataframe
result = pd.concat([pd.DataFrame(datalist[i]) for i in range(len(datalist))], ignore_index=True)

#creating JSON version
jsonData = df[0].to_json(orient='records')

#creating JSON file
with open('data.json', 'w') as f:
    json.dump(jsonData, f)
