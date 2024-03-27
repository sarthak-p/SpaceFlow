package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
	private final ProjectMapper projectMapper;
	private final ProjectRepository projectRepository;
	private final TeamRepository teamRepository;
	
	
	@Override
	public ProjectDto createProject(ProjectDto projectDto, Long teamId) {
		Project project = projectMapper.dtoToEntity(projectDto);
		Optional<Team> optionalTeam = teamRepository.findById(teamId);
		if(optionalTeam.isEmpty()) {
			throw new NotFoundException("No such team with ID exists in database");
		}
		
		Team team = optionalTeam.get();
		project.setTeam(team);
		project.setActive(true);
		team.getProjects().add(project);
		
		projectRepository.saveAndFlush(project);
		
		return(projectMapper.entityToDto(project));
	}


	@Override
	public ProjectDto editProject(ProjectDto projectDto, Long projectId) {
		Project editProject = projectMapper.dtoToEntity(projectDto);
		Optional<Project> optionalProject = projectRepository.findById(projectId);
		if(optionalProject.isEmpty()) {
			throw new NotFoundException("No such project with ID exists in database");
		}
		
		Project project = optionalProject.get();
		
		project.setName(editProject.getName());
		project.setDescription(editProject.getDescription());
		return projectMapper.entityToDto(project);
	}

}
