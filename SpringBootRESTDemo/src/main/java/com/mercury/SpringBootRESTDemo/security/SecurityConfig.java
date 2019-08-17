package com.mercury.SpringBootRESTDemo.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.mercury.SpringBootRESTDemo.security.handler.AccessDeniedHandlerImpl;
import com.mercury.SpringBootRESTDemo.security.handler.AuthenticationEntryPointImpl;
import com.mercury.SpringBootRESTDemo.security.handler.AuthenticationFailureHandlerImpl;
import com.mercury.SpringBootRESTDemo.security.handler.AuthenticationSuccessHandlerImpl;
import com.mercury.SpringBootRESTDemo.security.handler.LogoutSuccessHandlerImpl;

// 用java作configuration，可以用XML，我们用java annotation
@EnableWebSecurity // @Configuration把class定义为configuration class，可以做Spring configuration
@EnableGlobalMethodSecurity(prePostEnabled=true) // 为了使用annotation based来限定权限
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired // @Resource和@Autowired是取对象
	UserDetailsService userDetailsService; // 父类会搜索任何实现UserDetailsServiceImpl
	
	@Autowired
	LogoutSuccessHandlerImpl logoutSuccessHandlerImpl;
	
	// 用handler重新定义成功/失败返回的信息
	@Autowired
	AuthenticationSuccessHandlerImpl authenticationSuccessHandlerImpl;
	@Autowired
	AuthenticationFailureHandlerImpl authenticationFailureHandlerImpl;
	@Autowired
	AuthenticationEntryPointImpl authenticationEntryPointImpl;
	@Autowired
	AccessDeniedHandlerImpl accessDeniedHandlerImpl;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// turn off csrf
		http.csrf().disable();
		// login
		http.formLogin()
			.loginProcessingUrl("/login") // 指定login的API地址
			.usernameParameter("username") // 如果前台和后台的username password名字不一样，重新定义下
			.passwordParameter("password")
			.successHandler(authenticationSuccessHandlerImpl)
			.failureHandler(authenticationFailureHandlerImpl);
		// authorization
		http.authorizeRequests()
			.antMatchers("/test.html").permitAll(); // declarative way
//			.antMatchers(HttpMethod.GET, "/samples").authenticated()
//			.antMatchers(HttpMethod.GET, "/products").hasAnyRole("USER", "ADMIN")
//			.antMatchers(HttpMethod.GET, "/orders").hasAnyRole("ADMIN");
		// error handling: user access authenticated resource 要求用户登录
		http.exceptionHandling().authenticationEntryPoint(authenticationEntryPointImpl);
		// error handling: user access authenticated resource 要求用户的相应权限
		http.exceptionHandling().accessDeniedHandler(accessDeniedHandlerImpl);
		// remember me, default keeps username and password 2 weeks
		http.rememberMe();
		// logout
		http.logout()
			.logoutUrl("/logout")
			.logoutSuccessHandler(logoutSuccessHandlerImpl);
		http.cors();
	}
	
	// create a PasswordEncoder in Spring IoC container
	// 在spring container创建对象的两种方法：
	// 1. 在@Controller @Service @Component放在class上，spring会scan并创建一个对象
	// 2. 包含@Configuration的class(eg. @EnableWebSecurity @SpringBootApplication)也会被spring scan，
	// 如果用了@Bean，会在spring container创建一个对象
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11); // 11代表hash的强度值，数字越大越复杂，开销越大
	}
	
	// 通过告诉spring把AuthenticationManagerBuilder都autowire进来，让spring security使用userDetailsService对象
	// builder告诉要用哪个passwordEncoder
	@Autowired 
	public void setup(AuthenticationManagerBuilder builder) throws Exception {
		// 第一个passwordEncoder是userDetailsService的方法
		builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	
	// solve cross origin problem
	/*
	 * cors support
	 */
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // 设置白名单
        configuration.addAllowedOrigin("*"); // You should only set trusted site here. e.g. http://localhost:4200 means only this site can access. 所有的方法都通过
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
