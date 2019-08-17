package com.mercury.SpringBootRESTDemo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Interview;
import com.mercury.SpringBootRESTDemo.dao.InterviewDao;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class InterviewService {

	private final Logger LOGGER = LoggerFactory.getLogger(InterviewService.class);

	@Autowired
	InterviewDao interviewDao;
	
	public List<Interview> findAllInterviews() {
		return interviewDao.findAll();
	}
	
	public Interview findInterviewUsingId(Long id) {
		return interviewDao.findById(id).get();
	}

	public void addInterview(Interview interview) {
		interviewDao.save(interview);
	}
	
	public Response saveInterview(Interview interview) {
		try {
			interviewDao.save(interview);
			return new Response(true);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new Response(false);
		}
	}
	
	public Response deleteInterview(Long id) {
		try {
			interviewDao.deleteById(id);
			return new Response(true);
		} catch (Exception e) {
			return new Response(false);
		}
	}
	
	public void updateInterview(Long id, Interview interview) {
		Optional<Interview> oldOptional = interviewDao.findById(id);
		if (oldOptional.isPresent()) {
			Interview old = oldOptional.get();
			old.setEmployee(interview.getEmployee());
			old.setCandidate(interview.getCandidate());
			old.setInterview_date(interview.getInterview_date());
			old.setInterview_time(interview.getInterview_time());
			old.setLocation(interview.getLocation());
			
			interviewDao.save(old);
		}
	}
	
}
