package com.mercury.SpringBootRESTDemo.security.validation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.mercury.SpringBootRESTDemo.http.Response;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public final ResponseEntity<Response> handleUserNotFoundException(MethodArgumentNotValidException exception, WebRequest request) {
		Response response = new Response(false, 400, exception.getMessage());
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
}
