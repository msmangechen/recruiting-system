package com.mercury.SpringBootRESTDemo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Candidate;
import com.mercury.SpringBootRESTDemo.dao.CandidateDao;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class CandidateService {
	private final Logger LOGGER = LoggerFactory.getLogger(CandidateService.class);

	@Autowired
	CandidateDao candidateDao;

	public List<Candidate> findAllCandidates() {
		return candidateDao.findAll();
	}

	public Candidate findCandidateUsingId(Long id) {
		return candidateDao.findById(id).get();
	}

	public Response saveCandidate(Candidate candidate) {
		try {
			candidateDao.save(candidate);
			return new Response(true);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new Response(false);
		}
	}

	public Response deleteCandidate(Long id) {
		try {
			candidateDao.deleteById(id);
			return new Response(true);
		} catch (Exception e) {
			return new Response(false);
		}
	}

	public void updateCandidate(Long id, Candidate candidate) {
		Optional<Candidate> oldOptional = candidateDao.findById(id);
		if (oldOptional.isPresent()) {
			Candidate old = oldOptional.get();
			old.setName(candidate.getName());
			old.setEmail(candidate.getEmail());
			old.setDate_birth(candidate.getDate_birth());
			old.setDegree(candidate.getDegree());
			old.setPost_website(candidate.getPost_website());
			candidateDao.save(old);
		}
	}

}
