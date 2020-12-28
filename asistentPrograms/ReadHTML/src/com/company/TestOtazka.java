package com.company;

public class TestOtazka {

    public String otazka_title;
    public int otazka_body;
    public String imageURL;
    public String[] moznosti;

    public TestOtazka() {
        this.otazka_title = "";
        this.otazka_body = 0;
        this.imageURL = "";
        this.moznosti = new String[3];
    }

    public String getOtazka_title() {
        return otazka_title;
    }

    public void setOtazka_title(String otazka_title) {
        this.otazka_title = otazka_title;
    }

    public int getOtazka_body() {
        return otazka_body;
    }

    public void setOtazka_body(int otazka_body) {
        this.otazka_body = otazka_body;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String[] getMoznosti() {
        return moznosti;
    }

    public void setMoznosti(String[] moznosti) {
        this.moznosti = moznosti;
    }
}
