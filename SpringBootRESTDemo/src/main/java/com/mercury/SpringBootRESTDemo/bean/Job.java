package com.mercury.SpringBootRESTDemo.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "mango_job")
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_JOB_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_JOB_SEQ_GEN", sequenceName = "MANGO_JOB_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String name;
	@Column
	private Date created_date;
	@Column
	private String location;
	@ManyToOne
	@JoinColumn(name = "dept_id", referencedColumnName = "id")
	private Department department;

	public Job() {
		super();
	}

	public Job(long id, String name, Date created_date, String location, Department department) {
		super();
		this.id = id;
		this.name = name;
		this.created_date = created_date;
		this.location = location;
		this.department = department;
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

	public Date getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

}
