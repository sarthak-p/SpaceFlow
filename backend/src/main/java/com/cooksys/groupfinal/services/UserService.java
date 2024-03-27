package com.cooksys.groupfinal.services;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	Set<CompanyDto> getCompanies(Long id); 
}
