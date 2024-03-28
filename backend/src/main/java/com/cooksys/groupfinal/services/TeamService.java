package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;

public interface TeamService {

	TeamDto getTeamById(Long id);

	TeamDto creatTeam(Long companyId, TeamDto teamDto);

	Set<ProjectDto> getProjects(Long id);

	Set<TeamDto> getAllTeams();

}
