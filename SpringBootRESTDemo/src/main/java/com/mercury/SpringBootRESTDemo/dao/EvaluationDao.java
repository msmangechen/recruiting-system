package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Evaluation;

public interface EvaluationDao extends JpaRepository<Evaluation, Long> {

}
