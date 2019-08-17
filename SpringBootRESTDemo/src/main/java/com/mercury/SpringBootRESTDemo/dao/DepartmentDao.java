package com.mercury.SpringBootRESTDemo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.Department;

public interface DepartmentDao extends JpaRepository<Department, Long> {

	List<Department> findByName(String name);
	
}
