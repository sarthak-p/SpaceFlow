package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

	ProjectDto createProject(ProjectDto projectDto, Long teamId);

	ProjectDto editProject(ProjectDto projectDto, Long projectId);

	ProjectDto getProject(Long projectId);

}
