package com.myorg.feedback.controllers;

import java.time.ZonedDateTime;
import java.util.List;

import javax.xml.crypto.Data;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myorg.feedback.jpa.Feedback;
import com.myorg.feedback.jpa.User;
import com.myorg.feedback.model.AuthResponse;
import com.myorg.feedback.model.FeedbackRequest;
import com.myorg.feedback.model.LoginRequest;
import com.myorg.feedback.model.NewUserRequest;
import com.myorg.feedback.services.FeedbackService;
import com.myorg.feedback.services.UserService;
import com.myorg.feedback.util.JwtUtil;

@RestController
@RequestMapping(value="/api")
public class FeedbackController {
	
	Logger log = LogManager.getLogger(FeedbackController.class);
	
    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping(value="/feedback")
    public Feedback submitFeedback(@RequestBody FeedbackRequest request) throws Exception {
    	
    	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
          String username = authentication.getName(); // Get the username of the current user

          // Load the complete user object, including the Id
          User user = userService.findByUsername(username);
          Long userId = user.getId(); 
    	
        Feedback feedback = new Feedback();
		feedback.setUserId(userId.toString());
		feedback.setRating(request.getRating());
		feedback.setDateTime(ZonedDateTime.now());
		feedback.setFeedbackText(request.getComment());
		feedback.setUsername(username);
		return feedbackService.save(feedback);
    }

    @PostMapping(value="/feedback/signup")
    public User addUser(@RequestBody NewUserRequest request) throws Exception {
    	
    	  log.info("username - " + request.getUsername());
    	  log.info("password - " + request.getPassword());
    	  
    	  if(userService.findByUsername(request.getUsername()) != null) throw new Exception("username already Exists");
    	  
          User user = new User();
          user.setUserName(request.getUsername());
          user.setPassword(request.getPassword());
          user.setRole(request.getRole());
    	
		return userService.save(user);
    }
 
    @GetMapping(value="/feedback/admin")
    public List<Feedback> getAllFeedbackForAdmin() {
    	
      return feedbackService.findAll();
    }
    

    @GetMapping(value="/feedback/self")
    public List<Feedback> getMyFeedback() {
    	
    	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
          String username = authentication.getName(); // Get the username of the current user
          
          User user = userService.findByUsername(username);
          Long userId = user.getId(); 
                    
          return feedbackService.findAllByUserId(userId.toString()); 
    }
    

    @PostMapping(value="/feedback/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public AuthResponse generateToken(@RequestBody LoginRequest authRequest) throws Exception {
    	
    	AuthResponse response = new AuthResponse();
        try {
        		
        	
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
            User user = userService.findByUsername(authRequest.getUserName());
            response.setRole(user.getRole());

        } catch (Exception ex) {
            throw new Exception("Invalid Credentials");
        }
        
        response.setJwtToken(jwtUtil.generateToken(authRequest.getUserName()));
        response.setUserName(authRequest.getUserName());
        
        return response;
    }
}
