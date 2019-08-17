package com.mercury.SpringBootRESTDemo.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.Employee;
import com.mercury.SpringBootRESTDemo.dao.EmployeeDao;
import com.mercury.SpringBootRESTDemo.http.Response;
import com.mercury.SpringBootRESTDemo.service.EmployeeService;

@RestController()
@RequestMapping("/employees")
public class EmployeeController {

	@Autowired
	EmployeeDao employeeDao;

	@Autowired
	EmployeeService employeeService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@GetMapping
	public List<Employee> getEmployees() {
		return employeeDao.findAll();
	}

	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
	@PostMapping
	public Response addEmployee(@Valid @RequestBody Employee employee) {
		employee.getEmployee_detail().setEmployee(employee);
		return employeeService.register(employee);
	}
	
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
//	@PutMapping
//	public Response changeEmployee(@RequestBody Employee employee, Authentication authentication) {
//		return employeeService.changePassword(employee, authentication);
//	}
	
//	public Long deleteEmployee(@PathVariable Long id) {
//		employeeService.deleteEmployee(id);
//		return id;
//	}
//	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public Response deleteEmployee(@PathVariable Long id) {
		return employeeService.deleteEmployee(id);
	}

}
