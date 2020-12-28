package com.zaverecna.crud.autoskolaAPI.repozitory;

import com.zaverecna.crud.autoskolaAPI.entity.TrafficSign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrafficSignRepozitory extends CrudRepository<TrafficSign,Integer> {

    @Query("Select DISTINCT t.section from TrafficSign t")
    String[] getAllSections();

    @Query("Select t from TrafficSign t where t.section LIKE :sectionName")
    Iterable<TrafficSign> findAllBySection(@Param("sectionName") String name);
}
