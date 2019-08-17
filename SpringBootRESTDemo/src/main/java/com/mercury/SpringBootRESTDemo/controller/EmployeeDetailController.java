package com.mercury.SpringBootRESTDemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.EmployeeDetail;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.EmployeeDetailService;
import com.mercury.SpringBootRESTDemo.service.EmployeeService;

@RestController
@RequestMapping("/employee-detail")
public class EmployeeDetailController {

	@Autowired
	EmployeeService employeeService;

	@Autowired
	EmployeeDetailService employeeDetailService;

	@GetMapping("/{id}")
	public EmployeeDetail getEmployeeDetailUsingId(@PathVariable Long id) {
		return employeeDetailService.findEmployeeDetailUsingEmployee(employeeService.findEmployeeById(id));
	}
	
	@PostMapping
	public Response postEmployeeDetails(@RequestBody EmployeeDetail employeeDetail, Authentication authentication) {
		return employeeDetailService.addEmployeeDetail(employeeDetail, authentication);
	}
	
	@PutMapping("/{id}")
	public boolean putCandidate(@RequestBody EmployeeDetail employeeDetail) {
		employeeDetailService.updateEmployeeDetail(employeeDetail);
		return true;
	}
}
