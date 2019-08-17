package com.mercury.SpringBootRESTDemo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Employee;
import com.mercury.SpringBootRESTDemo.bean.EmployeeDetail;
import com.mercury.SpringBootRESTDemo.dao.DepartmentDao;
import com.mercury.SpringBootRESTDemo.dao.EmployeeDao;
import com.mercury.SpringBootRESTDemo.dao.EmployeeDetailDao;
import com.mercury.SpringBootRESTDemo.http.EmployeeDetailResponse;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class EmployeeDetailService {

	@Autowired
	EmployeeDao employeeDao;
	
	@Autowired
	DepartmentDao departmentDao;

	@Autowired
	EmployeeDetailDao employeeDetailDao;

	public List<EmployeeDetail> findAllEmployeeDetails() {
		return employeeDetailDao.findAll();
	}

	public EmployeeDetail findEmployeeDetailUsingEmployee(Employee employee) {
		return employeeDetailDao.findByEmployee(employee);
	}
	
	public Response addEmployeeDetail(EmployeeDetail employeeDetail, Authentication authentication) {
		Employee employee = employeeDao.findByUsername(authentication.getName());
		employeeDetail.setEmployee(employee);
		return new EmployeeDetailResponse(true, employeeDetailDao.save(employeeDetail));
	}

	public void updateEmployeeDetail(EmployeeDetail employeeDetail) {
		EmployeeDetail ed = employeeDetailDao.findById(employeeDetail.getId()).get();
		employeeDetail.setEmployee(ed.getEmployee());
		ed.setName(employeeDetail.getName());
		ed.setEmail(employeeDetail.getEmail());
		ed.setPhone(employeeDetail.getPhone());
		ed.setHire_date(employeeDetail.getHire_date());
		ed.setSsn(employeeDetail.getSsn());
		ed.setAddress(employeeDetail.getAddress());
		ed.setEmployee_type(employeeDetail.getEmployee_type());
		employeeDetailDao.save(ed);
	}

}
