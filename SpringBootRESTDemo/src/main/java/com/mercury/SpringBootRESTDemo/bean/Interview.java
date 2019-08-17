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
@Table(name = "mango_interview")
public class Interview {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_INTERVIEW_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_INTERVIEW_SEQ_GEN", sequenceName = "MANGO_INTERVIEW_SEQ", allocationSize = 1)
	private long id;
	@ManyToOne
	@JoinColumn(name = "emp_id", referencedColumnName = "id")
	private Employee employee;
	@ManyToOne
	@JoinColumn(name = "cand_id", referencedColumnName = "id")
	private Candidate candidate;
	@Column
	private Date interview_date;
	@Column
	private String interview_time;
	@Column
	private String location;

	public Interview() {
		super();
	}

	public Interview(long id, Employee employee, Candidate candidate, Date interview_date, String interview_time,
			String location) {
		super();
		this.id = id;
		this.employee = employee;
		this.candidate = candidate;
		this.interview_date = interview_date;
		this.interview_time = interview_time;
		this.location = location;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public Date getInterview_date() {
		return interview_date;
	}

	public void setInterview_date(Date interview_date) {
		this.interview_date = interview_date;
	}

	public String getInterview_time() {
		return interview_time;
	}

	public void setInterview_time(String interview_time) {
		this.interview_time = interview_time;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
