package com.project.questapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.questapp.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

	List<Post> findByUserId(Long userId);
}
