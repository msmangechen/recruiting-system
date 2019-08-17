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
@Table(name = "mango_candidate")
public class Candidate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_CANDIDATE_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_CANDIDATE_SEQ_GEN", sequenceName = "MANGO_CANDIDATE_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String name;
	@Column
	private Date date_birth;
	@Column
	private String email;
	@Column
	private String degree;
	@ManyToOne
	@JoinColumn(name = "from_website_id", referencedColumnName = "id")
	private PostWebsite post_website;

	public Candidate() {
		super();
	}

	public Candidate(long id, String name, Date date_birth, String email, String degree, PostWebsite post_website) {
		super();
		this.id = id;
		this.name = name;
		this.date_birth = date_birth;
		this.email = email;
		this.degree = degree;
		this.post_website = post_website;
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

	public Date getDate_birth() {
		return date_birth;
	}

	public void setDate_birth(Date date_birth) {
		this.date_birth = date_birth;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public PostWebsite getPost_website() {
		return post_website;
	}

	public void setPost_website(PostWebsite post_website) {
		this.post_website = post_website;
	}

}
