package com.zaverecna.crud.autoskolaAPI.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TestQuestion ")
public class TestQuestion {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name="question", columnDefinition="TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String question;
    @Column(name="imageURL")
    private String imageURL;
    @Column(name="points")
    private int points;
    @Column(name="testgroup")
    private String testgroup;
    @Column(name="testnumber")
    private int testnumber;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "joinToQuestion", referencedColumnName = "id")
    @Column(name="answers")
    private List<TestAnswer> answers = new ArrayList<>();


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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public List<TestAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<TestAnswer> answers) {
        this.answers = answers;
    }

    public String getTestgroup() {
        return testgroup;
    }

    public void setTestgroup(String testgroup) {
        this.testgroup = testgroup;
    }

    public int getTestnumber() {
        return testnumber;
    }

    public void setTestnumber(int testnumber) {
        this.testnumber = testnumber;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @Override
    public String toString() {
        return "\n\nTestQuestion{" +
                "id=" + id +
                ", question='" + question + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", points=" + points +
                ", testgroup='" + testgroup + '\'' +
                ", testnumber=" + testnumber +
                ", answers=" + answers.toString() +
                '}';
    }
}
