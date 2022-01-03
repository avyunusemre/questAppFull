package com.project.questapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.questapp.entities.Like;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.PostRepository;
import com.project.questapp.requests.PostCreateRequest;
import com.project.questapp.requests.PostUpdateRequest;
import com.project.questapp.responses.LikeResponse;
import com.project.questapp.responses.PostResponse;

@Service
public class PostService {

	private PostRepository postRepo;
	private UserService userService;
	private LikeService likeService;
	
	public PostService(PostRepository postRepo, UserService userService) {
		this.postRepo = postRepo;
		this.userService = userService;
	}
	
	public void setLikeService(LikeService likeService) {
		this.likeService = likeService;
	}

	public List<PostResponse> getAllPosts(Optional<Long> userId) {
		List<Post> list;
		if(userId.isPresent()) {
			list = postRepo.findByUserId(userId.get());
		}else {
			list = postRepo.findAll();
		}
		return list.stream().map(post -> { 
			List<LikeResponse> likes = likeService.getAllLikes(Optional.empty(),Optional.of(post.getId()));	
			return new PostResponse(post,likes);}).collect(Collectors.toList());
	}

	public Post getOnePostById(Long postId) {
		return postRepo.findById(postId).orElse(null);
	}

	public Post createOnePost(PostCreateRequest newPostRequest) {
		User user = userService.getOneUserById(newPostRequest.getUserId());
		if(user == null) {
			return null;
		}
		
		Post toSave = new Post();
		toSave.setId(newPostRequest.getId());
		toSave.setText(newPostRequest.getText());
		toSave.setTitle(newPostRequest.getTitle());
		toSave.setUser(user);
		return postRepo.save(toSave);
	}

	public Post updatePostById(Long postId, PostUpdateRequest postUpdate) {
		Optional<Post> post = postRepo.findById(postId);
		if(post.isPresent()) {
			Post toUpdate = post.get();
			toUpdate.setText(postUpdate.getText());
			toUpdate.setTitle(postUpdate.getTitle());
			postRepo.save(toUpdate);
			return toUpdate;
		}
		return null;
	}

	public void deleteOnePostById(Long postId) {
		postRepo.deleteById(postId);
	}

	
}
