package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-26T13:38:11-0500",
    comments = "version: 1.4.1.Final, compiler: Eclipse JDT (IDE) 3.37.0.v20240206-1609, environment: Java 17.0.10 (Eclipse Adoptium)"
)
@Component
public class TeamMapperImpl implements TeamMapper {

    @Autowired
    private BasicUserMapper basicUserMapper;

    @Override
    public TeamDto entityToDto(Team team) {
        if ( team == null ) {
            return null;
        }

        TeamDto teamDto = new TeamDto();

        teamDto.setDescription( team.getDescription() );
        teamDto.setId( team.getId() );
        teamDto.setName( team.getName() );
        teamDto.setTeammates( basicUserMapper.entitiesToBasicUserDtos( team.getTeammates() ) );

        return teamDto;
    }

    @Override
    public Set<TeamDto> entitiesToDtos(Set<Team> teams) {
        if ( teams == null ) {
            return null;
        }

        Set<TeamDto> set = new HashSet<TeamDto>( Math.max( (int) ( teams.size() / .75f ) + 1, 16 ) );
        for ( Team team : teams ) {
            set.add( entityToDto( team ) );
        }

        return set;
    }
}
