package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Review;

public interface ReviewDao extends JpaRepository<Review, Long> {
	
}
