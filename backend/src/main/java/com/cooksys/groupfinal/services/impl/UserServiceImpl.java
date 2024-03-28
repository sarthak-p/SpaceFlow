package com.cooksys.groupfinal.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;

	private final CompanyRepository companyRepository;
	private final CompanyMapper companyMapper;
	
	private final TeamRepository teamRepository;
	private final TeamMapper teamMapper;

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
	public Set<CompanyDto> getCompanies(Long id) {

		Set<Company> companies = companyRepository.findByEmployeesId(id);

		return companyMapper.entitiesToDtos(companies);
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto, Long companyId) {

		if (!companyRepository.existsById(companyId)) {
			log.error("Company with ID {} not found", companyId);
			throw new NotFoundException("No such company with given ID");
		}

		Company company = companyRepository.findById(companyId).get();
		User user = fullUserMapper.requestDtoToEntity(userRequestDto);

		user.setActive(true);
		user.setStatus("PENDING");

		Set<Company> companies = user.getCompanies();
		if(user.isAdmin()) {
			Set<Company> allCompanies = new HashSet<>(companyRepository.findAll());
			user.setCompanies(allCompanies);
			userRepository.saveAndFlush(user);
			for(Company comp : allCompanies) {
				Set<User> users = comp.getEmployees();
				users.add(user);
				comp.setEmployees(users);
			}
			companyRepository.saveAllAndFlush(allCompanies);
		}
		else {
			companies.add(company);
			user.setCompanies(companies);
			userRepository.saveAndFlush(user);
			Set<User> users = company.getEmployees();
			users.add(user);
			company.setEmployees(users);
			companyRepository.saveAndFlush(company);
		}
		
		
		return fullUserMapper.entityToFullUserDto(user);
	}

	@Override
	public Set<TeamDto> getTeams(Long id) {
		
		Set<Team> userTeams = teamRepository.findByTeammatesId(id);
		
		return teamMapper.entitiesToDtos(userTeams);
	}

	@Override
	public BasicUserDto deleteUser(String username) {
		Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		if(optionalUser.isEmpty()) {
			throw new BadRequestException("No active use with given username");
		}
		User userToDelete = optionalUser.get();
		
		return null;
	}

}
