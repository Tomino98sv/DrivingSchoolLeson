package com.zaverecna.crud.autoskolaAPI.service;


import com.zaverecna.crud.autoskolaAPI.entity.FirstAidQuestion;
import com.zaverecna.crud.autoskolaAPI.entity.TestQuestion;
import com.zaverecna.crud.autoskolaAPI.repozitory.FirstAidRepozitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FirstAidService {

    @Autowired
    private FirstAidRepozitory repozitory;

    public FirstAidQuestion saveQuestion(FirstAidQuestion test){
        return  repozitory.save(test);
    }

    public Iterable<FirstAidQuestion> getAllQuestions(){
        return repozitory.findAll();
    }

    public List<FirstAidQuestion> getAllQuestionBySection(String section){
        return repozitory.findBySectionGroup(section);
    }

    public String[] getSectionNames(){
        return repozitory.findDistinctSectionNames();
    }
}
