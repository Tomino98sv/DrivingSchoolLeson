package com.zaverecna.crud.autoskolaAPI.service;

import com.zaverecna.crud.autoskolaAPI.entity.TrafficSign;
import com.zaverecna.crud.autoskolaAPI.repozitory.TrafficSignRepozitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrafficSignService {

    @Autowired
    private TrafficSignRepozitory repozitory;

    public Iterable<TrafficSign> getAllTrafficSigns(){
        return repozitory.findAll();
    }

    public Iterable<TrafficSign> insertTrafficSigns(List<TrafficSign> trafficSigns){
        return repozitory.saveAll(trafficSigns);
    }

    public String[] getAllSections(){
        return repozitory.getAllSections();
    }

    public Iterable<TrafficSign> getTrafficSignsBySection(String name){
        return repozitory.findAllBySection(name);
    }
}
