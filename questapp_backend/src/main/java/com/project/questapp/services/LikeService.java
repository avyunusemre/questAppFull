package com.project.questapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Like;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.LikeRepository;
import com.project.questapp.requests.LikeCreateRequest;
import com.project.questapp.responses.LikeResponse;

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

	public List<LikeResponse> getAllLikes(Optional<Long> userId, Optional<Long> postId) {
		List<Like> list;
		if(userId.isPresent() && postId.isPresent()){
			list = likeRepo.findByUserIdAndPostId(userId,postId);
		} else if(userId.isPresent()) {
			list = likeRepo.findByUserId(userId);
		} else if(postId.isPresent()) {
			list = likeRepo.findByPostId(postId);
		} else 
			list = likeRepo.findAll();
		
		return list.stream().map(like -> new LikeResponse(like)).collect(Collectors.toList());
	}

	public Like getOneLikeById(Long likeId) {
		return likeRepo.findById(likeId).orElse(null);
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
		} else
		
		return null;
	}

	public void deleteLikeById(Long likeId) {
		likeRepo.deleteById(likeId);
	}
}
