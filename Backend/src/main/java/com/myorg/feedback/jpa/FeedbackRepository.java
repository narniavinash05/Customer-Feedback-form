package com.myorg.feedback.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	List<Feedback> findAllByUserId(String userId); 
}