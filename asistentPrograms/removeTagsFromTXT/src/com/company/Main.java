package com.company;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {
	// write your code here

        String Dodatkovétabuľky = "C:\\Users\\Tomas\\Downloads\\zaloha\\Dodatkové tabuľky.txt";
        String Dopravnézariadenia = "C:\\Users\\Tomas\\Downloads\\zaloha\\Dopravné zariadenia.txt";
        String Informačnéznačky = "C:\\Users\\Tomas\\Downloads\\zaloha\\Informačné značky.txt";
        String Regulačnéznačky = "C:\\Users\\Tomas\\Downloads\\zaloha\\Regulačné značky.txt";
        String Svetelnésignályapokyny = "C:\\Users\\Tomas\\Downloads\\zaloha\\Svetelné signály a pokyny.txt";
        String Vodorovnédopravnéznačky = "C:\\Users\\Tomas\\Downloads\\zaloha\\Vodorovné dopravné značky.txt";
        String Výstražnéznačky = "C:\\Users\\Tomas\\Downloads\\zaloha\\Výstražné značky.txt";

        modifyTXT(Dodatkovétabuľky,"Dodatkové tabuľky");
        modifyTXT(Dopravnézariadenia,"Dopravné zariadenia");
        modifyTXT(Informačnéznačky,"Informačné značky");
        modifyTXT(Regulačnéznačky,"Regulačné značky");
        modifyTXT(Svetelnésignályapokyny,"Svetelné signály a pokyny");
        modifyTXT(Vodorovnédopravnéznačky,"Vodorovné dopravné značky");
        modifyTXT(Výstražnéznačky,"Výstražné značky");
    }

    public static void modifyTXT(String path,String nameOfNew){

        BufferedReader reader;

        try {
            reader = new BufferedReader(
                    new InputStreamReader(
                            new FileInputStream(path),StandardCharsets.UTF_8));

            PrintWriter writer = new PrintWriter("C:\\Users\\Tomas\\Downloads\\prerobenie\\"+nameOfNew+".txt", StandardCharsets.UTF_8);

            String line = reader.readLine();
            ArrayList<String> assistentImages = new ArrayList<>();
            boolean assistentImageFound = false;
            while (line != null) {
                System.out.println(line);
                if(line.startsWith("https:")){
                    for (int i=0;i<assistentImages.size();i++) {
                        line += "\n{"+(i+1)+"}="+assistentImages.get(i);
                    }
                    line += "\n";
                    assistentImages = new ArrayList<>();
                }
                int startTag = line.indexOf('<');
                int endTag = line.indexOf('>');
                while(startTag != -1 && endTag != -1){
                    String tag = line.substring(startTag,endTag+1);
                    if(tag.startsWith("<img")){
                        int urlStart = tag.indexOf("src=");
                        String urlImg = tag.substring(urlStart+5,tag.length()-2 );
                        assistentImages.add(urlImg);
                        assistentImageFound = true;
                    }
                    if (assistentImageFound){
                        line = line.replace(tag,"{"+assistentImages.size()+"}");
                        assistentImageFound = false;
                    }else {
                        line = line.replace(tag,"");
                    }
                    startTag = line.indexOf('<');
                    endTag = line.indexOf('>');
                }
                if (!line.isEmpty()){
                    writer.write("\n"+line);
                }
                line = reader.readLine();
            }
            reader.close();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
