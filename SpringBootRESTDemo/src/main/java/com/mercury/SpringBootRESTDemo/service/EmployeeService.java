package com.mercury.SpringBootRESTDemo.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mercury.SpringBootRESTDemo.bean.Employee;
import com.mercury.SpringBootRESTDemo.bean.EmployeePermission;
import com.mercury.SpringBootRESTDemo.dao.EmployeeDao;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class EmployeeService {

	private final Logger LOGGER = LoggerFactory.getLogger(EmployeeService.class);

	@Autowired
	EmployeeDao employeeDao;

	@Autowired
	PasswordEncoder passwordEncoder;
	
	public Employee findEmployeeById(Long id) {
		return employeeDao.findById(id).get();
	}
	
	public Response register(Employee employee) {
		System.out.println(employee.toString());
		try {
			employee.setPassword(passwordEncoder.encode(employee.getPassword()));
			List<EmployeePermission> permissions = new ArrayList<EmployeePermission>();
			permissions.add(new EmployeePermission(2));
			employee.setPermissions(permissions);
			employeeDao.save(employee);
			return new Response(true);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new Response(false, 400, e.getMessage());
		}
		
	}
	
//	public Response changePassword(Employee employee, Authentication authentication) {
//		if(employee.getUsername().equals(authentication.getName()) || SecurityUtils.isAdmin(authentication.getAuthorities())) {
//			Employee e = employeeDao.findByUsername(employee.getUsername());
//			e.setPassword(passwordEncoder.encode(employee.getPassword()));
//			employeeDao.save(e);
//		}else {
//			//TODO: Not authorize to update password if not current loggedin user or admin.
//			return new Response(false);
//		}
//		return new Response(true);
//	}
	
	public Response deleteEmployee(Long id) {
		if(employeeDao.findById(id).get() != null) {
			employeeDao.deleteById(id);
			return new Response(true);
		}else {
			return new Response(false, "Employee is not found!");
		}
	}
	
}
