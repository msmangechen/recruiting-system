package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Interview;

public interface InterviewDao extends JpaRepository<Interview, Long> {

}
