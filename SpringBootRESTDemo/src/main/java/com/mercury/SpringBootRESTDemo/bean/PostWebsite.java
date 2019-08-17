package com.mercury.SpringBootRESTDemo.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "mango_post_website")
public class PostWebsite {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_POST_WEBSITE_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_POST_WEBSITE_SEQ_GEN", sequenceName = "MANGO_POST_WEBSITE_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String name;
	@Column
	private int price_per_post;
	@Column
	private String web_address;

	public PostWebsite() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PostWebsite(long id, String name, int price_per_post, String web_address) {
		super();
		this.id = id;
		this.name = name;
		this.price_per_post = price_per_post;
		this.web_address = web_address;
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

	public int getPrice_per_post() {
		return price_per_post;
	}

	public void setPrice_per_post(int price_per_post) {
		this.price_per_post = price_per_post;
	}

	public String getWeb_address() {
		return web_address;
	}

	public void setWeb_address(String web_address) {
		this.web_address = web_address;
	}

}
