package com.mercury.SpringBootRESTDemo.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "mango_department")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_DEPARTMENT_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_DEPARTMENT_SEQ_GEN", sequenceName = "MANGO_DEPARTMENT_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String name;
	@Column
	private String location;
	@Column
	private String phone;

	public Department() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Department(long id, String name, String location, String phone) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.phone = phone;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
