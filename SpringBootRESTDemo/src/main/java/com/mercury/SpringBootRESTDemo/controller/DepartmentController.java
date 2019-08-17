package com.mercury.SpringBootRESTDemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Department;
import com.mercury.SpringBootRESTDemo.service.DepartmentService;

@RestController
public class DepartmentController {
	
	@Autowired
	DepartmentService departmentService;
	
//	@PreAuthorize("isAuthenticated()")
	@GetMapping("/departments")
	public List<Department> getDepartments() {
		return departmentService.findAllDepartments();
	}
	
	@GetMapping("/departments/{name}")
	public List<Department> getDepartmentUsingName(@PathVariable String name) {
		return departmentService.findDepartmentUsingName(name);
	}
	
	@PostMapping("/departments")
	public void postDepartment(@RequestBody Department department) {
		departmentService.addDepartment(department);
	}
}
