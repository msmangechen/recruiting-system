package com.mercury.SpringBootRESTDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.SpringBootRESTDemo.bean.PostWebsite;

public interface PostWebsiteDao extends JpaRepository<PostWebsite, Long> {

}
