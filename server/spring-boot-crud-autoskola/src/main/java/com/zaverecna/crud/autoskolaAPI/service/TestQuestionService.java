package com.zaverecna.crud.autoskolaAPI.service;

import com.zaverecna.crud.autoskolaAPI.entity.TestQuestion;
import com.zaverecna.crud.autoskolaAPI.repozitory.TestQuestionRepozitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestQuestionService {

    @Autowired
    private TestQuestionRepozitory repozitory;

    public TestQuestion saveQuestion(TestQuestion test){
        return  repozitory.save(test);
    }

    public Iterable<TestQuestion> getAllQuestions(){
        return repozitory.findAll();
    }

    public List<TestQuestion> getTestQuestionByStringQuestion(String question) {
        return repozitory.findByQuestionText(question);
//        Optional<TestQuestion> opt = repozitory.findByQuestionText(question);
//        if (opt.isEmpty()){
//            return new TestQuestion();
//        }else {
//            return opt.get();
//        }
    }

    public Iterable<TestQuestion> getTestQuestions(int testNbm){
        return repozitory.findQuestionsByTest(testNbm);
    }

    public List<Integer> getAllNeededTestsNumberForGroup(String name){
        System.out.println(repozitory.collectNumbersOfTestByGroup(name));
        return repozitory.collectNumbersOfTestByGroup(name);
    }

}
