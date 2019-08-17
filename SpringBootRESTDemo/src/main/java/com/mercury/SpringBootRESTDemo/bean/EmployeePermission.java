package com.mercury.SpringBootRESTDemo.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "mango_employee_permission")
public class EmployeePermission implements GrantedAuthority {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	@Column
	private String type;

	public EmployeePermission() {
		super();
	}
	
	public EmployeePermission(long id) {
		super();
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "EmployeePermission [id=" + id + ", type=" + type + "]";
	}

	@Override
	public String getAuthority() {
		return type;
	}

}
