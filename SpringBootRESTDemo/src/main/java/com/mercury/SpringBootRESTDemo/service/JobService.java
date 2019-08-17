package com.mercury.SpringBootRESTDemo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.bean.Job;
import com.mercury.SpringBootRESTDemo.dao.JobDao;
import com.mercury.SpringBootRESTDemo.http.Response;

@Service
@Transactional
public class JobService {
	private final Logger LOGGER = LoggerFactory.getLogger(JobService.class);

	@Autowired
	JobDao jobDao;

	public List<Job> findAllJobs() {
		return jobDao.findAll();
	}

	public Job findJobUsingId(Long id) {
		return jobDao.findById(id).get();
	}

	public void addJob(Job job) {
		jobDao.save(job);
	}

	public Response saveJob(Job job) {
		try {
			jobDao.save(job);
			return new Response(true);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return new Response(false);
		}
	}

	public Response deleteJob(Long id) {
		try {
			jobDao.deleteById(id);
			return new Response(true);
		} catch (Exception e) {
			return new Response(false);
		}
	}

	public void updateJob(Long id, Job job) {
		Optional<Job> oldOptional = jobDao.findById(id);
		if (oldOptional.isPresent()) {
			Job old = oldOptional.get();
			old.setName(job.getName());
			old.setCreated_date(job.getCreated_date());
			old.setLocation(job.getLocation());
			old.setDepartment(job.getDepartment());
			jobDao.save(old);
		}
	}

}
