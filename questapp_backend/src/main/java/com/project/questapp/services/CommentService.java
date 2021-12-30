package com.project.questapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.CommentRepository;
import com.project.questapp.requests.CommentCreateRequest;
import com.project.questapp.requests.CommentUpdateRequest;

@Service
public class CommentService {
	
	private CommentRepository commentRepo;
	private UserService userService;
	private PostService postService;
	
	public CommentService(CommentRepository commentRepo,UserService userService,PostService postService) {
		this.commentRepo = commentRepo;
		this.userService = userService;
		this.postService = postService;
	}

	public List<Comment> getAllComments(Optional<Long> userId, Optional<Long> postId) {
		if(userId.isPresent() && postId.isPresent()) {
			return commentRepo.findByUserIdAndPostId(userId.get(), postId.get());
		} else if(userId.isPresent()) {
			return commentRepo.findByUserId(userId.get());
		} else if(postId.isPresent()) {
			return commentRepo.findByPostId(postId.get());
		}
		return commentRepo.findAll();
	}

	public Comment getOneCommentById(Long commentId) {
		return commentRepo.findById(commentId).orElse(null);
	}
	
	public Comment createOneComment(CommentCreateRequest request) {
		User user = userService.getOneUserById(request.getUserId());
		Post post = postService.getOnePostById(request.getPostId());
		if(user != null && post != null) {
			Comment commentToSave = new Comment();
			commentToSave.setId(request.getId());
			commentToSave.setUser(user);
			commentToSave.setPost(post);
			commentToSave.setText(request.getText());
			return commentRepo.save(commentToSave);
		}
		return null;
	}

	public Comment updateCommentById(Long commentId, CommentUpdateRequest request) {
		Optional<Comment> comment = commentRepo.findById(commentId);
		if(comment.isPresent()) {
			Comment commentToUpdate = comment.get();
			commentToUpdate.setText(request.getText());
			return commentRepo.save(commentToUpdate);
		}
		return null;
	}

	public void deleteCommentById(Long commentId) {
		commentRepo.deleteById(commentId);
	}
	
	
	
}
