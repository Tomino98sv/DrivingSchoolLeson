package com.company;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class SpracovanieTestu {

    public String filePath;
    public ArrayList<TestOtazka> otazky;

    public SpracovanieTestu() {
        this.filePath="";
        otazky = new ArrayList<>();
    }

    public void readHtmlFile(String filePath) throws IOException {
        this.filePath = filePath;
            File input = new File(filePath);
            Document doc = Jsoup.parse(input, "UTF-8");
            Elements body = doc.select("li.test-otazka");

            for (Element otazka : body) {
                TestOtazka testOtazka = new TestOtazka();

                Elements moznostiTag = otazka.select("div.moznosti").select("label.check");
                String[] moznostiTexty = new String[3];
                int count = 0;
                for (Element moznost : moznostiTag) {
                    moznostiTexty[count] = moznost.text();
                    count++;
                }

                testOtazka.setImageURL(otazka.select("div.image").select("img").attr("src"));
                testOtazka.setMoznosti(moznostiTexty);
                testOtazka.setOtazka_title(otazka.select("div.otazka-title").select("p").text());
                testOtazka.setOtazka_body(Character.getNumericValue(otazka.select("div.otazka-body").select("p").text().charAt(0)));
                this.otazky.add(testOtazka);
            }
    }


    public void writeOutput(String outPathFile) throws IOException {
        FileWriter test = new FileWriter(outPathFile);
        for (TestOtazka otazka : this.otazky) {

                test.write(otazka.otazka_title+"\n");
                test.write(otazka.otazka_body+"\n");
                if(otazka.imageURL != "")
                {
                    test.write(otazka.imageURL+"\n");
                }
                for (String moznost : otazka.getMoznosti()) {
                    test.write(moznost+"\n");
                }
                test.write("\n");
        }
        test.close();
    }
}
