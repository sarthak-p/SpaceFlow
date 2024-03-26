package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
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
public class ProjectMapperImpl implements ProjectMapper {

    @Autowired
    private TeamMapper teamMapper;

    @Override
    public ProjectDto entityToDto(Project project) {
        if ( project == null ) {
            return null;
        }

        ProjectDto projectDto = new ProjectDto();

        projectDto.setActive( project.isActive() );
        projectDto.setDescription( project.getDescription() );
        projectDto.setId( project.getId() );
        projectDto.setName( project.getName() );
        projectDto.setTeam( teamMapper.entityToDto( project.getTeam() ) );

        return projectDto;
    }

    @Override
    public Set<ProjectDto> entitiesToDtos(Set<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        Set<ProjectDto> set = new HashSet<ProjectDto>( Math.max( (int) ( projects.size() / .75f ) + 1, 16 ) );
        for ( Project project : projects ) {
            set.add( entityToDto( project ) );
        }

        return set;
    }
}
