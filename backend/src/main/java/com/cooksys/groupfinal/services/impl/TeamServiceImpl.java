package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

	private final TeamRepository teamRepository;
	private final TeamMapper teamMapper;

	private final CompanyRepository companyRepository;

	private final UserRepository userRepository;
	private final BasicUserMapper basicUserMapper;
	
	private final ProjectMapper projectMapper;

	@Override
	public TeamDto getTeamById(Long id) {
		Optional<Team> optionalTeam = teamRepository.findById(id);
		if (optionalTeam.isEmpty()) {
			throw new NotFoundException("A team with the provided id does not exist.");
		}
		Team team = optionalTeam.get();

		return teamMapper.entityToDto(team);
	}

	@Override
	public TeamDto creatTeam(Long companyId, TeamDto teamDto) {

		Team team = new Team();
		team.setName(teamDto.getName());
		team.setDescription(teamDto.getDescription());

		team.setCompany(companyRepository.findById(companyId).get());

		Set<User> userList = new HashSet<>();

		for (BasicUserDto basicUserDto : teamDto.getTeammates()) {
			Optional<User> optionalUser = userRepository.findById(basicUserDto.getId());
			if (optionalUser.isPresent()) {
				userList.add(optionalUser.get());
			}
		}

			team.setTeammates(userList);

			Team savedTeam = teamRepository.save(team);

			return teamMapper.entityToDto(savedTeam);
	}

	@Override
	public Set<ProjectDto> getProjects(Long id) {
		Optional<Team> team = teamRepository.findById(id);
		
		Team teamToUse = team.get();
		
		Set<Project> projects = teamToUse.getProjects();
		
		projects.removeIf(project -> !project.isActive());
		
		return projectMapper.entitiesToDtos(projects);
	}

	@Override
	public Set<TeamDto> getAllTeams() {
		Set<Team> teams = new HashSet<>(teamRepository.findAll());
		return teamMapper.entitiesToDtos(teams);
	}
}
