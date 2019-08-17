package com.mercury.SpringBootRESTDemo.bean;

import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "mango_employee")
public class Employee implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MANGO_EMPLOYEE_SEQ_GEN")
	@SequenceGenerator(name = "MANGO_EMPLOYEE_SEQ_GEN", sequenceName = "MANGO_EMPLOYEE_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String username;
	@Column
	private String password;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "mango_emp_emp_permission", joinColumns = {
			@JoinColumn(name = "emp_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "emp_permission_id", referencedColumnName = "id") })
	@JsonIgnore
	private List<EmployeePermission> permissions;
	@OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
	private EmployeeDetail employee_detail;

	public Employee() {
		super();
	}

	public Employee(long id, String username, String password, List<EmployeePermission> permissions,
			EmployeeDetail employee_detail) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.permissions = permissions;
		this.employee_detail = employee_detail;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<EmployeePermission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<EmployeePermission> permissions) {
		this.permissions = permissions;
	}

	public EmployeeDetail getEmployee_detail() {
		return employee_detail;
	}

	public void setEmployee_detail(EmployeeDetail employee_detail) {
		this.employee_detail = employee_detail;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return permissions;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
