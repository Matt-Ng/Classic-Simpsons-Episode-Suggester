from requests import get
from bs4 import BeautifulSoup as Soup
import json

id = 0
listofeps = []
for i in range(1,9):
    url = get("https://www.imdb.com/title/tt0096697/episodes?season=" + str(i))
    request = url.text
    soup_data = Soup(request, 'html.parser')
    soup_data.title.text
    #print(soup_data.title.text)
    episodes = soup_data.findAll('div',{'class':'list_item'})
    
    for count, j in enumerate(episodes):
        epi = {}
        title = j.find('div', {'class':'info'}).strong.text
        date = j.find('div', {'class':'airdate'}).text.strip()
        descript = j.find('div', {'class':'item_description'}).text.strip()
        info = j.find('a', href=True)
        seasonep = info.text.strip().split(" ")
        season = seasonep[0][1]
        rating = j.find('span', {'class':'ipl-rating-star__rating'}).text
        imglink = j.find('img', src=True)['src']
        #print("Title: " + title)
        #print("Season: " + season)
        #print("Episode: " + str(count+1))
        #print("Airdate: " +  date)
        #print("Description: " + descript)
        #print("Link: https://www.imdb.com" + info['href'])
        #print("IMDB Rating: " + rating)
        #print("id: " + str(id))
        epi['title'] = title
        epi['season'] = season
        epi['episode'] = count+1
        epi['airdate'] = date
        epi['description'] = descript
        epi['link'] = "https://www.imdb.com" + info['href']
        epi['rating'] = rating
        epi['id'] = id
        epi['likes'] = 0
        epi['dislikes'] = 0
        epi['imglink'] = imglink

        listofeps.append(epi)
        #print(epi)
        id+=1

with open('epidata.json', 'w') as f:
    json.dump(listofeps, f)
    #print("-------------------------------")
    
    