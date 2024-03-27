package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;

public interface TeamService {

	TeamDto getTeamById(Long id);

	TeamDto creatTeam(Long companyId, TeamDto teamDto);

}
