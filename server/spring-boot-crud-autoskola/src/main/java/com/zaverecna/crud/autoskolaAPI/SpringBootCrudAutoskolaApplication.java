package com.zaverecna.crud.autoskolaAPI;

import com.zaverecna.crud.autoskolaAPI.repozitory.TrafficSignRepozitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
public class SpringBootCrudAutoskolaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootCrudAutoskolaApplication.class, args);
	}

}
