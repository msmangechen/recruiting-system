package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Candidate;

public interface CandidateDao extends JpaRepository<Candidate, Long> {
	
}
