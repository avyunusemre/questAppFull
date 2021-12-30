package com.project.questapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Like;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.LikeRepository;
import com.project.questapp.requests.LikeCreateRequest;

@Service
public class LikeService {

	private LikeRepository likeRepo;
	private UserService userService;
	private PostService postService;
	
	public LikeService(LikeRepository likeRepo, UserService userService, PostService postService) {
		this.likeRepo = likeRepo;
		this.userService = userService;
		this.postService = postService;
	}

	public List<Like> getAllLikes(Optional<Long> userId, Optional<Long> postId) {
		if(userId.isPresent() && postId.isPresent()){
			return likeRepo.findByUserIdAndPostId(userId,postId);
		} else if(userId.isPresent()) {
			return likeRepo.findByUserId();
		} else if(postId.isPresent()) {
			return likeRepo.findByPostId(postId);
		} else 
			return likeRepo.findAll();
	}

	public Like getOneLikeById(Long likeId) {
		return likeRepo.getById(likeId);
	}

	public Like createOneLike(LikeCreateRequest request) {
		User user = userService.getOneUserById(request.getUserId());
		Post post = postService.getOnePostById(request.getPostId());
		
		if(user != null && post != null) {
			Like likeToSave = new Like();
			likeToSave.setId(request.getId());
			likeToSave.setPost(post);
			likeToSave.setUser(user);
			return likeRepo.save(likeToSave);
		}
		
		return null;
	}

	public void deleteLikeById(Long likeId) {
		likeRepo.deleteById(likeId);
	}
}
