package com.company;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javax.print.attribute.TextSyntax;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class Main {

    public static void main(String[] args) {
	// write your code here

            for (int i=1; i<=60; i++) {

                try {
                    SpracovanieTestu spracovanieTestu = new SpracovanieTestu();
                    spracovanieTestu.readHtmlFile("C:\\Users\\Tomas\\Desktop\\zmazat\\test"+i+".txt");
                    spracovanieTestu.writeOutput("C:\\Users\\Tomas\\Desktop\\zaverecna\\testy_autoskola\\test"+i+".txt");

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

    }
}
