package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Employee;
import com.mercury.SpringBootRESTDemo.bean.EmployeeDetail;

public interface EmployeeDetailDao extends JpaRepository<EmployeeDetail, Long> {
	
	EmployeeDetail findByEmployee(Employee employee);
	
}
