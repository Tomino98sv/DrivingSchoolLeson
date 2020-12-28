import mechanize
from bs4 import BeautifulSoup
from traffic_sign import Traffic_Sign

url = "https://www.testynavodicak.eu/znacky"

# zbieranie linkov z uvodnej page
br = mechanize.Browser()
page = br.open(url)
src_code = page.read()

document = BeautifulSoup(src_code,features="html5lib")
firstDivision = document.find("div",{"class":"znacky-vyber"}).find_all("a")
linksUL = {} # uvodne linky

for a in firstDivision:
    title = a.find("p").getText()
    pageLink = a["href"]
    imageLink = a.find("img")["src"]
    linksUL[title] = {"pageLink":pageLink,"imageLink":imageLink}
# koniec zbierania linkov na uvodnej page

# zbieranie linkov z prveho prekliku = zvisle dopravne znacky
page = br.open(list(linksUL.values())[0]["pageLink"])
src_code = page.read()

document = BeautifulSoup(src_code,features="html5lib")
division_zvisleDopravneZnacky = document.find("div",{"class":"znacky-vyber"}).find_all("a")
linksZDZ = {} #zvisle doppravne znacky = linky

for a in division_zvisleDopravneZnacky:
    title = a.find("p").getText()
    pageLink = a["href"]
    imageLink = a.find("img")["src"]
    linksZDZ[title] = {"pageLink":pageLink,"imageLink":imageLink}
# koniec zbierania linkov z prveho prekliku = zvisle dopravne znacky

def getTraffic_Signs(link):
    src_code = link.read()
    document = BeautifulSoup(src_code,features="html5lib")
    #VystrazneZnacky = document.find_all("div",{"class":"znacky-vyber"})
    znackyTag = document.select("div.znacky-vyber li")
    znacky = []
    for li in znackyTag:
        trfsign = Traffic_Sign(
            li.find("p").getText(),
            li.find("a")["data-description"],
            li.find("a")["href"]
        )
        znacky.append(trfsign)
    return znacky

def writeTraffic_SignsToFile(title,array):
    f = open("C:\\Users\\Tomas\\Desktop\\zaverecna\\znacky\\"+title+".txt", "w")
    for znacka in array:
        f.write(znacka.getTitle()+"\n")
        f.write(znacka.getDescription()+"\n")
        f.write(znacka.getImagesrc()+"\n")
        f.write("\n")
    f.close()


vystrazneZnacky = getTraffic_Signs(br.open(list(linksZDZ.values())[0]["pageLink"]))
regulacneZnacky = getTraffic_Signs(br.open(list(linksZDZ.values())[1]["pageLink"]))
informacneZnacky = getTraffic_Signs(br.open(list(linksZDZ.values())[2]["pageLink"]))
dodatkoveZnacky = getTraffic_Signs(br.open(list(linksZDZ.values())[3]["pageLink"]))

vodorovne_dopravneZnacky = getTraffic_Signs(br.open(list(linksUL.values())[1]["pageLink"]))
dopravneZariadenia = getTraffic_Signs(br.open(list(linksUL.values())[2]["pageLink"]))
svetelneSignaly_a_Pokyny = getTraffic_Signs(br.open(list(linksUL.values())[3]["pageLink"]))

writeTraffic_SignsToFile(list(linksZDZ.keys())[0],vystrazneZnacky)
writeTraffic_SignsToFile(list(linksZDZ.keys())[1],regulacneZnacky)
writeTraffic_SignsToFile(list(linksZDZ.keys())[2],informacneZnacky)
writeTraffic_SignsToFile(list(linksZDZ.keys())[3],dodatkoveZnacky)

writeTraffic_SignsToFile(list(linksUL.keys())[1],vodorovne_dopravneZnacky)
writeTraffic_SignsToFile(list(linksUL.keys())[2],dopravneZariadenia)
writeTraffic_SignsToFile(list(linksUL.keys())[3],svetelneSignaly_a_Pokyny)

