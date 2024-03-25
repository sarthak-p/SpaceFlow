package com.cooksys.groupfinal.services;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	Set<FullUserDto> getAllUsers();

	Set<BasicUserDto> getAllUsersBasic();

   
}
