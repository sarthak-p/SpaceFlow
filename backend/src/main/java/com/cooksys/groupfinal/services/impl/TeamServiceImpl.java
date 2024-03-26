package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
	
	private final TeamRepository teamRepository;
	private final TeamMapper teamMapper;
	
	
	@Override
	public TeamDto getTeamById(Long id) {
        Optional<Team> optionalTeam = teamRepository.findById(id);
        if (optionalTeam.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        Team team = optionalTeam.get();
        		
        return teamMapper.entityToDto(team);
	}

}
