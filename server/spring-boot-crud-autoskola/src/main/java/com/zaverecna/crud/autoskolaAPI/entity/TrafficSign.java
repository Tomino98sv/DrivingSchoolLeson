package com.zaverecna.crud.autoskolaAPI.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TrafficSign {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition="VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String title;
    @Column(columnDefinition="TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String body = "";
    private String imgUrl;
    @Column(columnDefinition="VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String section = "";
    @ElementCollection
    private Map<Integer,String> assistantImgUrl = new HashMap<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Map<Integer, String> getAssistantImgUrl() {
        return assistantImgUrl;
    }

    public void setAssistantImgUrl(Map<Integer, String> assistantImgUrl) {
        this.assistantImgUrl = assistantImgUrl;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    @Override
    public String toString() {
        return "\n" +
                "title=" + title + "\n" +
                "body=" + body + "\n" +
                "imgUrl=" + imgUrl + "\n" +
                "section=" + section + "\n" +
                "assistantImgUrl=" + assistantImgUrl +"\n";
    }
}
