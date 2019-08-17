package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.EmployeeType;

public interface EmployeeTypeDao extends JpaRepository<EmployeeType, Long> {

}
