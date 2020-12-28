package com.zaverecna.crud.autoskolaAPI.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "FirstAidQuestion ")
public class FirstAidQuestion {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name="question", columnDefinition="TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String question;
    @Column(name="section", columnDefinition="TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String sectionGroup;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "joinToQuestion", referencedColumnName = "id")
    @Column(name="answers")
    private List<FirstAidAnswer> answers = new ArrayList<>();

    private int count;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getSectionGroup() {
        return sectionGroup;
    }

    public void setSectionGroup(String sectionGroup) {
        this.sectionGroup = sectionGroup;
    }

    public List<FirstAidAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<FirstAidAnswer> answers) {
        this.answers = answers;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "FirstAidQuestion{\n" +
                "id=" + id +
                ", \nquestion='" + question + '\'' +
                ", \nsectionGroup='" + sectionGroup + '\'' +
                ", \nanswers=" + answers +
                ", \ncount=" + count +
                '}';
    }
}
