package com.mercury.SpringBootRESTDemo.http;

import com.mercury.SpringBootRESTDemo.bean.Employee;

public class AuthenticationSuccessResponse extends Response {

	private Employee employee; // 成功了我想要employee，失败了就不需要

	public AuthenticationSuccessResponse(boolean success, int code, String message, Employee employee) {
		super(success, code, message);
		this.employee = employee;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

}
