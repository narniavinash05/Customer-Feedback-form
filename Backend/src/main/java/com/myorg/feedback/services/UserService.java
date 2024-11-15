package com.myorg.feedback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myorg.feedback.jpa.User;
import com.myorg.feedback.jpa.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUserName(username);
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).get();

    }

    public User save(User user) {
        // TODO Auto-generated method stub
        return userRepository.save(user);
    }

}