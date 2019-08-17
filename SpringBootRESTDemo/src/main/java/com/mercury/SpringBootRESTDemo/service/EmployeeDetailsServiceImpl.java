package com.mercury.SpringBootRESTDemo.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mercury.SpringBootRESTDemo.dao.EmployeeDao;

@Service
@Transactional
public class EmployeeDetailsServiceImpl implements UserDetailsService {

	@Autowired
	EmployeeDao employeeDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return employeeDao.findByUsername(username);
	}

}
