package com.project.questapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.User;
import com.project.questapp.repos.UserRepository;

@Service
public class UserService {

	UserRepository userRepo;

	public UserService(UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	public User createNewUser(User user) {
		return userRepo.save(user);
	}

	public User getOneUserById(Long userId) {
		return userRepo.findById(userId).orElse(null);
	}

	public User updateUser(Long userId, User newUser) {
		Optional<User> user =userRepo.findById(userId);
		if(user.isPresent()) {
			User foundUser = user.get();
			foundUser.setUserName(newUser.getUserName());
			foundUser.setPassword(newUser.getPassword());
			userRepo.save(foundUser);
			return foundUser;
		} else 
			return null;
	}

	public void deleteUser(Long userId) {
		userRepo.deleteById(userId);
	}
	
}
