package com.cooksys.groupfinal.controllers;

import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

	private final UserService userService;
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	// @PostMapping("/{companyId}")
	// public FullUserDto createUser(@RequestBody BasicUserDto basicUserDto, @PathVariable Long companyId) {
	// 	return userService.createUser(basicUserDto, companyId);
	// }

	@PostMapping("/{companyId}")
	public FullUserDto createUser(@RequestBody UserRequestDto userRequestDto, @PathVariable Long companyId) {
		return userService.createUser(userRequestDto, companyId);
	}

	
	@PostMapping("/login")
	public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
		return userService.login(credentialsDto);
	}

	@GetMapping("/{id}/companies")
	public Set<CompanyDto> getCompanies(@PathVariable Long id) {
		return userService.getCompanies(id);
	}
	
	@GetMapping("/{id}/teams")
	public Set<TeamDto> getTeams(@PathVariable Long id) {
		return userService.getTeams(id);
	}
	
	@DeleteMapping("/{username}")
	public BasicUserDto deleteUser(@PathVariable String username) {
		return userService.deleteUser(username);
	}
}
