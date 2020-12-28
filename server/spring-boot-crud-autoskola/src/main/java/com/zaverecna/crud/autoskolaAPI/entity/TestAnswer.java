package com.zaverecna.crud.autoskolaAPI.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TestAnswer ")
public class TestAnswer {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition="TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String answer;

    private boolean correctness;

    private char aChar;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean isCorrectness() {
        return correctness;
    }

    public void setCorrectness(boolean correctness) {
        this.correctness = correctness;
    }

    public char getaChar() {
        return aChar;
    }

    public void setaChar(char aChar) {
        this.aChar = aChar;
    }

    @Override
    public String toString() {
        return "\nTestAnswer{" +
                "id=" + id +
                ", answer='" + answer + '\'' +
                ", correctness=" + correctness +
                ", aChar=" + aChar +
                '}';
    }
}
