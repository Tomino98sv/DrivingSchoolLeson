package com.zaverecna.crud.autoskolaAPI.controller;

import com.zaverecna.crud.autoskolaAPI.entity.TestAnswer;
import com.zaverecna.crud.autoskolaAPI.entity.TestQuestion;
import com.zaverecna.crud.autoskolaAPI.service.TestQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@RestController
@RequestMapping(path = "/questionTest")
public class QuestionTestController {

    @Autowired
    private TestQuestionService service;

    @GetMapping("/getAllQuestions")
    public Iterable<TestQuestion> returnAllQuestions(){
        return service.getAllQuestions();
    }

    @GetMapping("/getQuestionByQuestion/{text}")
    public List<TestQuestion> getQuestionByQuestion(@PathVariable("text") String question){ // moze vratit viackrat tu otazku lebo sa otazka moze nachadzat vo viacerych testoch
        return  service.getTestQuestionByStringQuestion(question);
    }

    @GetMapping("/getAllTestQuestions/{testnumber}")
    public Iterable<TestQuestion> returnAllQuestionsFromTest(@PathVariable("testnumber") int testNbm){
        return service.getTestQuestions(testNbm);
    }

    @GetMapping("/getNumbersOfTestsByGroup/{nameOfTestGroup}")
    public List<Integer> returnArrayOfTestsByGroup(@PathVariable("nameOfTestGroup") String name){
        return service.getAllNeededTestsNumberForGroup(name);
    }

    @GetMapping("/loadTests")
    public void load_Write_TestQ(){

        for(int i=1;i<=60;i++){
            List<TestQuestion> all_Question_inTest = new ArrayList<TestQuestion>();

            try {
                File test = new File("..\\datasource\\testy_autoskola\\test"+i+".txt");
                File testOdpoved = new File("..\\datasource\\odpovede_autoskola\\odpovedeTest"+i+".txt");

                List<Character> char_answers = new ArrayList<>();

                Scanner myReader = new Scanner(testOdpoved);
                while (myReader.hasNextLine()){
                    char_answers.add(myReader.nextLine().charAt(0));
                }

                int questionCounter = 0;
                int questionParts = 0;
                TestQuestion testQuestion = new TestQuestion();
                List<TestAnswer> testAnswers = new ArrayList<TestAnswer>();
                myReader = new Scanner(test);

                while (myReader.hasNextLine()){
                    String line = myReader.nextLine();
                    questionParts++;
                    if(questionParts == 1)testQuestion.setQuestion(line);
                    if(questionParts == 2)testQuestion.setPoints(Integer.valueOf(line));
                    if(questionParts == 3 && !line.isEmpty()){
                        questionParts--;
                        if(line.charAt(0) == 'a' || line.charAt(0) == 'b' || line.charAt(0) == 'c'){
                            TestAnswer testAnswer = new TestAnswer();
                            testAnswer.setaChar(line.charAt(0));
                            testAnswer.setAnswer(line.substring(3));
                            boolean correctness = line.charAt(0) == char_answers.get(questionCounter);
                            testAnswer.setCorrectness(correctness);
                            testAnswers.add(testAnswer);
                        }else {
                            testQuestion.setImageURL(line);
                        }
                    }

                    if (line.isEmpty()){ //initialize question and his answers
                        testQuestion.setTestgroup(getTestGroup(i));
                        testQuestion.setAnswers(testAnswers);
                        testQuestion.setTestnumber(i);
                        all_Question_inTest.add(testQuestion);

                        questionCounter++;
                        questionParts = 0;
                        testQuestion = new TestQuestion();
                        testAnswers = new ArrayList<>();

                    }
                }

            }catch (Exception e){
                e.printStackTrace();
                System.out.println("Test fall down on :"+i);
            }

            all_Question_inTest.forEach(q -> {
                service.saveQuestion(q);
            });
        }
    }

    public String getTestGroup(int i){
        if(i<=35){
            return "A+B";
        }
        if (i>=36 && i<=60){
            return "C+D+T";
        }
        return "undefined group";
    }
}
