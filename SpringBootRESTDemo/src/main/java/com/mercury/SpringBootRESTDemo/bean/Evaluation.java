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
@Table(name = "mango_evaluation")
public class Evaluation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_EVALUATION_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_EVALUATION_SEQ_GEN", sequenceName = "MANGO_EVALUATION_SEQ", allocationSize = 1)
	private long id;
	@ManyToOne
	@JoinColumn(name = "cand_id", referencedColumnName = "id")
	private Candidate candidate;
	@ManyToOne
	@JoinColumn(name = "job_id", referencedColumnName = "id")
	private Job job;
	@Column
	private Date eval_time;
	@Column
	private String status;

	public Evaluation() {
		super();
	}

	public Evaluation(long id, Candidate candidate, Job job, Date eval_time, String status) {
		super();
		this.id = id;
		this.candidate = candidate;
		this.job = job;
		this.eval_time = eval_time;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Date getEval_time() {
		return eval_time;
	}

	public void setEval_time(Date eval_time) {
		this.eval_time = eval_time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
