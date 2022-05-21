from bs4 import BeautifulSoup
import requests

URL = "https://in.investing.com/crypto/currencies"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
names = soup.find_all("td", class_="js-currency-name")
symbols = soup.find_all("td", class_="js-currency-symbol")
symbols= {}
print(soup)
for i in range(len(names)):
    print(names[i].text)
