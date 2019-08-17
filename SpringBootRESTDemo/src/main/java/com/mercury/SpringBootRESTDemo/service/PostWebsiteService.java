package com.mercury.SpringBootRESTDemo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.PostWebsite;
import com.mercury.SpringBootRESTDemo.dao.PostWebsiteDao;

@Service
@Transactional
public class PostWebsiteService {
	
	@Autowired
	PostWebsiteDao postWebsiteDao;
	
	public List<PostWebsite> findAllPostWebsites() {
		return postWebsiteDao.findAll();
	}
	
}
