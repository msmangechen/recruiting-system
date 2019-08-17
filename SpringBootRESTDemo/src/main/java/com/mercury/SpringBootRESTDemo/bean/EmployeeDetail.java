package com.mercury.SpringBootRESTDemo.bean;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "mango_employee_detail")
public class EmployeeDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_EMPLOYEE_DETAIL_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_EMPLOYEE_DETAIL_SEQ_GEN", sequenceName = "MANGO_EMPLOYEE_DETAIL_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String phone;
	@Column
	private Date hire_date;
	@Column
	private String ssn;
	@Column
	private String address;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "emp_id", referencedColumnName = "id")
	@JsonIgnore
	private Employee employee;
	@ManyToOne
	@JoinColumn(name = "dept_id", referencedColumnName = "id")
	private Department department;
	@ManyToOne
	@JoinColumn(name = "emp_type_id", referencedColumnName = "id")
	private EmployeeType employee_type;

	public EmployeeDetail() {
		super();
	}

	public EmployeeDetail(long id, String name, String email, String phone, Date hire_date, String ssn, String address,
			Employee employee, Department department, EmployeeType employee_type) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.hire_date = hire_date;
		this.ssn = ssn;
		this.address = address;
		this.employee = employee;
		this.department = department;
		this.employee_type = employee_type;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getHire_date() {
		return hire_date;
	}

	public void setHire_date(Date hire_date) {
		this.hire_date = hire_date;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public EmployeeType getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(EmployeeType employee_type) {
		this.employee_type = employee_type;
	}

}
