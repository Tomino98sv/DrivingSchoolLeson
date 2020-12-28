package com.zaverecna.crud.autoskolaAPI.repozitory;

import com.zaverecna.crud.autoskolaAPI.entity.FirstAidQuestion;
import com.zaverecna.crud.autoskolaAPI.entity.TestQuestion;
import com.zaverecna.crud.autoskolaAPI.entity.TrafficSign;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirstAidRepozitory extends CrudRepository<FirstAidQuestion,Integer> {

    @Query("Select f from FirstAidQuestion f where f.sectionGroup LIKE :section")
    List<FirstAidQuestion> findBySectionGroup(@Param("section") String section);

    @Query("Select DISTINCT f.sectionGroup from FirstAidQuestion f")
    String[] findDistinctSectionNames();
}
