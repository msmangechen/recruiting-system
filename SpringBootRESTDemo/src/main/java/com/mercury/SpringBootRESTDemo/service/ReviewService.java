package com.mercury.SpringBootRESTDemo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Review;
import com.mercury.SpringBootRESTDemo.dao.ReviewDao;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class ReviewService {

	private final Logger LOGGER = LoggerFactory.getLogger(ReviewService.class);

	@Autowired
	ReviewDao reviewDao;
	
	public List<Review> findAllReviews() {
		return reviewDao.findAll();
	}

	public Review findReviewUsingId(Long id) {
		return reviewDao.findById(id).get();
	}

	public void addReview(Review review) {
		reviewDao.save(review);
	}

	public Response saveReview(Review review) {
		try {
			reviewDao.save(review);
			return new Response(true);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new Response(false);
		}
	}

	public Response deleteReview(Long id) {
		try {
			reviewDao.deleteById(id);
			return new Response(true);
		} catch (Exception e) {
			return new Response(false);
		}
	}

	public void updateReview(Long id, Review review) {
		Optional<Review> oldOptional = reviewDao.findById(id);
		if (oldOptional.isPresent()) {
			Review old = oldOptional.get();
			old.setEvaluation(review.getEvaluation());
			old.setRating(review.getRating());
			old.setEmployee(review.getEmployee());
		}
	}

}
