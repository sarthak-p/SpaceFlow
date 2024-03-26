package com.cooksys.groupfinal.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
  private final FullUserMapper fullUserMapper;
  private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

	@Override
	public Set<FullUserDto> getAllUsers() {
		// TODO Auto-generated method stub
		return fullUserMapper.entitiesToFullUserDtos(userRepository.findAllByActiveTrue());
	}

	@Override
	public Set<BasicUserDto> getAllUsersBasic() {
		return basicUserMapper.entitiesToBasicUserDtos(userRepository.findAllByActiveTrue());
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto) {
		User user = fullUserMapper.requestDtoToEntity(userRequestDto);
		
		Credentials credentials = user.getCredentials();
		
		if(credentials.getUsername() == null || credentials.getPassword() == null) {
			throw new BadRequestException("Missing credentials");
		}
		
		if(userRepository.findByCredentialsUsernameAndActiveTrue(credentials.getUsername()) != null) {
			throw new BadRequestException("Username taken");
		}
		
		Profile profile = user.getProfile();
		
		if(profile.getEmail() == null) {
			throw new BadRequestException("Email must be provided");
		}
		
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
	}
	
	
	
	
	
	

}
