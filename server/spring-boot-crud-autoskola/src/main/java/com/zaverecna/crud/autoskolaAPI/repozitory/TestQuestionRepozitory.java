package com.zaverecna.crud.autoskolaAPI.repozitory;

import com.zaverecna.crud.autoskolaAPI.entity.TestQuestion;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestQuestionRepozitory extends CrudRepository<TestQuestion, Integer> {

    @Query("Select t from TestQuestion t where t.question LIKE :question")
    List<TestQuestion> findByQuestionText(@Param("question") String question);

    @Query("Select t from TestQuestion t where t.testnumber = :testNumb")
    Iterable<TestQuestion> findQuestionsByTest(@Param("testNumb") int number);

    @Query("Select DISTINCT t.testnumber from TestQuestion t where t.testgroup LIKE :groupName")
    List<Integer> collectNumbersOfTestByGroup(@Param("groupName") String name);
}
