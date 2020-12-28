package com.zaverecna.crud.autoskolaAPI.controller;

import com.zaverecna.crud.autoskolaAPI.entity.TrafficSign;
import com.zaverecna.crud.autoskolaAPI.service.TrafficSignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/trafficSign")
public class TrafficSignController {

    @Autowired
    private TrafficSignService service;

    @GetMapping("/getAllTrafficSigns")
    public Iterable<TrafficSign> returnAllTrafficSigns(){
        return service.getAllTrafficSigns();
    }

    @GetMapping("/getAllSections")
    public String[] getAllSections(){
        return service.getAllSections();
    }

    @GetMapping("/getTrafficSignsBySection/{sectionName}")
    public Iterable<TrafficSign> returnTrafficSignsBySection(@PathVariable("sectionName") String name){
        return service.getTrafficSignsBySection(name);
    }

    @GetMapping("/loadTrafficSigns")
    public Iterable<TrafficSign> load_Write_LoadTrafficSigns(){

        String Dodatkovétabuľky = "..\\datasource\\znacky\\Dodatkové tabuľky.txt";
        String Dopravnézariadenia = "..\\datasource\\znacky\\Dopravné zariadenia.txt";
        String Informačnéznačky = "..\\datasource\\znacky\\Informačné značky.txt";
        String Regulačnéznačky = "..\\datasource\\znacky\\Regulačné značky.txt";
        String Svetelnésignályapokyny = "..\\datasource\\znacky\\Svetelné signály a pokyny.txt";
        String Vodorovnédopravnéznačky = "..\\datasource\\znacky\\Vodorovné dopravné značky.txt";
        String Výstražnéznačky = "..\\datasource\\zaloha\\Výstražné značky.txt";

        List<TrafficSign> trafficSigns = new ArrayList<>();
        trafficSigns.addAll(createObjectsFromTXT(Dodatkovétabuľky));
        trafficSigns.addAll(createObjectsFromTXT(Dopravnézariadenia));
        trafficSigns.addAll(createObjectsFromTXT(Informačnéznačky));
        trafficSigns.addAll(createObjectsFromTXT(Regulačnéznačky));
        trafficSigns.addAll(createObjectsFromTXT(Svetelnésignályapokyny));
        trafficSigns.addAll(createObjectsFromTXT(Vodorovnédopravnéznačky));
        trafficSigns.addAll(createObjectsFromTXT(Výstražnéznačky));

        return service.insertTrafficSigns(trafficSigns);

    }

    public List<TrafficSign> createObjectsFromTXT(String path){
        List<TrafficSign> trafficSignsList = new ArrayList<>();
        TrafficSign trafficSign = new TrafficSign();
        Map<Integer,String> assistImages = new HashMap<>();
        BufferedReader reader;
        try {
            reader = new BufferedReader(
                    new InputStreamReader(
                            new FileInputStream(path), StandardCharsets.UTF_8));
            String line = "";
            int questionParts = 0;
            while (line != null) {
                line = reader.readLine();
                System.out.println(line);
                questionParts++;
                if(questionParts == 1)trafficSign.setTitle(line);
                if(questionParts == 2 && !line.startsWith("https:")){
                    questionParts--;
                    if (trafficSign.getBody() != ""){
                        line = "\n"+line;
                    }
                    trafficSign.setBody(trafficSign.getBody()+line);
                }
                if(questionParts == 2 && line.startsWith("https:")){
                    trafficSign.setImgUrl(line);
                }
                if(questionParts == 3 && !line.isEmpty()){
                    questionParts--;
                    int indexImg = Integer.valueOf(String.valueOf(line.charAt(1)));
                    String imgUrl = line.substring(4);
                    assistImages.put(indexImg,imgUrl);
                }

                if (line.isEmpty()){ //initialize trafficSign and reset counter
                    trafficSign.setAssistantImgUrl(assistImages);
                    String section = path.substring(path.lastIndexOf("\\")+1,path.length()-4);
                    System.out.println(section);
                    trafficSign.setSection(section);
                    trafficSignsList.add(trafficSign);
                    System.out.println(trafficSign.toString());
                    questionParts = 0;
                    assistImages = new HashMap<>();
                    trafficSign = new TrafficSign();
                }


            }
            reader.close();

        }catch (Exception e){

        }

        return trafficSignsList;
    }

}
