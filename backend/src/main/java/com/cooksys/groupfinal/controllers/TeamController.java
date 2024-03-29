package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class TeamController {
	
	private final TeamService teamService;

	@GetMapping("/{id}")
	public TeamDto getTeamById(@PathVariable Long id) {
		return teamService.getTeamById(id);
	}
	
	@PostMapping("/{companyId}")
	public TeamDto createTeam(@PathVariable Long companyId, @RequestBody TeamDto teamDto) {
		return teamService.creatTeam(companyId, teamDto);
	}
	
	@GetMapping("/{id}/projects")
	public Set<ProjectDto> getProjects(@PathVariable Long id) {
		return teamService.getProjects(id);
	}
	
	@GetMapping
	public Set<TeamDto> getAllTeams(){
		return teamService.getAllTeams();
	}
	
}
