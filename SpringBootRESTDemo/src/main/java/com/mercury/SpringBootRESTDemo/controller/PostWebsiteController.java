package com.mercury.SpringBootRESTDemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.SpringBootRESTDemo.bean.PostWebsite;
import com.mercury.SpringBootRESTDemo.service.PostWebsiteService;

@RestController
public class PostWebsiteController {

	@Autowired
	PostWebsiteService postWebsiteService;
	
	@GetMapping("/post_websites")
	public List<PostWebsite> getPostWebsite() {
		return postWebsiteService.findAllPostWebsites();
	}
	
}
