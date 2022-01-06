package com.project.questapp.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.questapp.entities.User;
import com.project.questapp.repos.UserRepository;
import com.project.questapp.security.JwtUserDetails;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private UserRepository userRepo;
	
	public UserDetailsServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUserName(username);
		return JwtUserDetails.create(user);
	}
	
	public UserDetails loadUserById(Long id) {
		User user = userRepo.findById(id).get();
		return JwtUserDetails.create(user);		
	}

}
