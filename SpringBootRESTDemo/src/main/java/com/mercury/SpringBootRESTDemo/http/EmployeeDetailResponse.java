package com.mercury.SpringBootRESTDemo.http;

import com.mercury.SpringBootRESTDemo.bean.EmployeeDetail;

public class EmployeeDetailResponse extends Response {

	private EmployeeDetail employeeDetail;

	public EmployeeDetailResponse(boolean success, EmployeeDetail employeeDetail) {
		super(success);
		this.employeeDetail = employeeDetail;
	}

	public EmployeeDetail getEmployeeDetail() {
		return employeeDetail;
	}

	public void setUserDetail(EmployeeDetail employeeDetail) {
		this.employeeDetail = employeeDetail;
	}
	
}
