package com.mercury.SpringBootRESTDemo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Department;
import com.mercury.SpringBootRESTDemo.dao.DepartmentDao;

@Service
@Transactional
public class DepartmentService {

	@Autowired
	DepartmentDao departmentDao;

	public List<Department> findAllDepartments() {
		return departmentDao.findAll();
	}
	
	public List<Department> findDepartmentUsingName(String name) {
		return departmentDao.findByName(name);
	}

	public void addDepartment(Department department) {
		departmentDao.save(department);
	}

}
