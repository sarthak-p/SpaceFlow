package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;
	
	@PostMapping("/{teamId}")
	public ProjectDto createProject(@RequestBody ProjectDto projectDto, @PathVariable Long teamId) {
		return projectService.createProject(projectDto, teamId);
	}
	
	@PatchMapping("/{projectId}")
	public ProjectDto editProject(@RequestBody ProjectDto projectDto, @PathVariable Long projectId) {
		return projectService.editProject(projectDto, projectId);
	}

}
