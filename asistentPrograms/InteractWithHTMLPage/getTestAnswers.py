from bs4 import BeautifulSoup
import mechanize
url = "https://www.testynavodicak.eu/online-testy"

br = mechanize.Browser()
br.open(url)

for x in range(1, 61):
    converted_num = str(x)
    br.select_form(nr=2)
    br["test-name"] = [converted_num]
    response = br.submit().get_data()
    print (converted_num)

    br.select_form(nr=2)
    response2 = br.submit().get_data()
    f = open("C:\\Users\\Tomas\\Desktop\\zaverecna\\odpovede_autoskola\\odpovedeTest"+converted_num+".txt", "w+")

    document = BeautifulSoup(response2,features="html5lib")
    moznosti = document.find_all("div", {"class": "moznosti"})
    for div in moznosti:
        f.write(div["data-correct-answer"]+"\n")
    br.back()
    br.back()
