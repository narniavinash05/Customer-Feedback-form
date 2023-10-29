package com.myorg.feedback.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myorg.feedback.jpa.Feedback;
import com.myorg.feedback.jpa.FeedbackRepository;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> findAll() {
        return feedbackRepository.findAll();
    }
    
    public Feedback save(Feedback feedback) {
    	return feedbackRepository.save(feedback);
    }

	public List<Feedback> findAllByUserId(String userId) {
		// TODO Auto-generated method stub
		return feedbackRepository.findAllByUserId(userId);
	}

}
