package com.zaverecna.crud.autoskolaAPI.controller;

import com.fasterxml.jackson.databind.node.TextNode;
import com.zaverecna.crud.autoskolaAPI.entity.FirstAidAnswer;
import com.zaverecna.crud.autoskolaAPI.entity.FirstAidQuestion;
import com.zaverecna.crud.autoskolaAPI.entity.TestQuestion;
import com.zaverecna.crud.autoskolaAPI.service.FirstAidService;
import com.zaverecna.crud.autoskolaAPI.service.TestQuestionService;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/firstAid")
public class FirstAidController {

    @Autowired
    private FirstAidService service;

    @GetMapping("/getAllQuestions")
    public Iterable<FirstAidQuestion> returnAllQuestions(){
        return service.getAllQuestions();
    }

    @GetMapping("/getSectionNames")
    public String[] getSectionNames(){
        return service.getSectionNames();
    }

    @GetMapping("/getTest")
    public String getTest(){
        return "testovacia linka";
    }

    @PostMapping("/getAllQuestionsBySection")
    public List<FirstAidQuestion> getAllQuestionsBySection(@RequestBody String section){
        System.out.println(section.getClass());
        return service.getAllQuestionBySection(section);
    }

    @GetMapping("/loadFirstAid")
    public List<FirstAidQuestion> loadFirstAid() {
        List<FirstAidQuestion> questionList = new ArrayList<>();

        if(service.getAllQuestions().size() != 0) {
            System.out.println("ALREADY INSERTED LOADED FIRST AID ");
            return  questionList;
        }else {
            System.out.println("Inserting FIRST AID ");

            int questionCount = 0;
            try {
                FileInputStream fis = new FileInputStream("..\\datasource\\prvapomoc\\prvaPomoc_repaired.docx");
                XWPFDocument xdoc = new XWPFDocument(OPCPackage.open(fis));

                String section = "";
                String question = "";

                FirstAidQuestion firstAidQuestion = null;
                List<FirstAidAnswer> answerList = new ArrayList<>();
                for (XWPFParagraph paragraph : xdoc.getParagraphs()) {


                    for (XWPFRun run : paragraph.getRuns()) {
                        if(!run.toString().isEmpty() && run.toString().charAt(0) != '\n'){ //there was !run.toString().isBlank()
                            if(run.isBold() && run.isItalic() && run.getUnderline().toString().equals("SINGLE")){
                                section = run.toString();
                            }else if(run.isBold()) {
                                question = question+run.toString();
                                if(question.indexOf(':') != -1 || question.indexOf('?') != -1){
                                    firstAidQuestion = new FirstAidQuestion();
                                    answerList = new ArrayList<>();
                                    firstAidQuestion.setQuestion(question);
                                    firstAidQuestion.setSectionGroup(section);
                                    questionCount++;
                                    firstAidQuestion.setCount(questionCount);
                                    questionList.add(firstAidQuestion);
                                    question = "";
                                }
                            }else {
                                FirstAidAnswer answer = new FirstAidAnswer();
                                answer.setAnswer(run.toString());
                                answer.setCorrectness(run.getUnderline().toString().equals("SINGLE"));
                                answerList.add(answer);
//                            System.out.println("Question "+firstAidQuestion.getCount()+"\n\t answer: "+answer+" underline "+run.getUnderline().toString());
                                firstAidQuestion.setAnswers(answerList);
                            }

                        }

                    }
                }

            } catch(Exception ex) {
                ex.printStackTrace();
            }
            questionList.forEach(q -> {
                service.saveQuestion(q);
            });
            return questionList;
        }

    }


}
