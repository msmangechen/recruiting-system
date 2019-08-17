package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Long> {

	Employee findByUsername(String username);
	
}
