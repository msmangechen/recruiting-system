package com.mercury.SpringBootRESTDemo.bean;

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
@Table(name = "mango_review")
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_REVIEW_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_REVIEW_SEQ_GEN", sequenceName = "MANGO_REVIEW_SEQ", allocationSize = 1)
	private long id;
	@ManyToOne
	@JoinColumn(name = "eval_id", referencedColumnName = "id")
	private Evaluation evaluation;
	@Column
	private int rating;
	@ManyToOne
	@JoinColumn(name = "emp_id", referencedColumnName = "id")
	private Employee employee;

	public Review() {
		super();
	}

	public Review(long id, Evaluation evaluation, int rating, Employee employee) {
		super();
		this.id = id;
		this.evaluation = evaluation;
		this.rating = rating;
		this.employee = employee;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Evaluation getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(Evaluation evaluation) {
		this.evaluation = evaluation;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

}
