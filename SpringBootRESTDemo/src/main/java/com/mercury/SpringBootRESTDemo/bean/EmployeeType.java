package com.mercury.SpringBootRESTDemo.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "mango_employee_type")
public class EmployeeType {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_EMPLOYEE_TYPE_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_EMPLOYEE_TYPE_SEQ_GEN", sequenceName = "MANGO_EMPLOYEE_TYPE_SEQ_GEN", allocationSize = 1)
	private long id;
	@Column
	private String name;

	public EmployeeType() {
		super();
	}

	public EmployeeType(long id, String name) {
		super();
		this.id = id;
		this.name = name;
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

}
