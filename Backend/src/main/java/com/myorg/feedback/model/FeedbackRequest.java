package com.myorg.feedback.model;

public class FeedbackRequest {

    private String comment;
    private Integer rating;


    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }


}
