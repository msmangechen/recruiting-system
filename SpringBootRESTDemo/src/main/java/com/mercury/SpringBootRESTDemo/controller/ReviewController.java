package com.mercury.SpringBootRESTDemo.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Review;
import com.mercury.SpringBootRESTDemo.dao.ReviewDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

	@Autowired
	ReviewDao reviewDao;
	
	@Autowired
	ReviewService reviewService;
	
	@GetMapping
	public List<Review> getReviews() {
		return reviewService.findAllReviews();
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping("/{id}")
	public Review getReviewById(@PathVariable Long id) {
		return reviewService.findReviewUsingId(id);
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@PostMapping
	public Response postReview(@Valid @RequestBody Review review) {
		return reviewService.saveReview(review);
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public boolean putReview(@PathVariable Long id, @RequestBody Review review) {
		reviewService.updateReview(id, review);
		return true;
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public Response deleteReview(@PathVariable Long id) {
		return reviewService.deleteReview(id);
	}
	
}
