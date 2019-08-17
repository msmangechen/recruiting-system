package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Job;

public interface JobDao extends JpaRepository<Job, Long> {
	
}
