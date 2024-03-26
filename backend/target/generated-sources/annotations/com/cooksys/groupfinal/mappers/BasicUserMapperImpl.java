package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;
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
public class BasicUserMapperImpl implements BasicUserMapper {

    @Autowired
    private ProfileMapper profileMapper;
    @Autowired
    private CredentialsMapper credentialsMapper;

    @Override
    public BasicUserDto entityToBasicUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        BasicUserDto basicUserDto = new BasicUserDto();

        basicUserDto.setActive( user.isActive() );
        basicUserDto.setAdmin( user.isAdmin() );
        basicUserDto.setId( user.getId() );
        basicUserDto.setProfile( profileMapper.entityToDto( user.getProfile() ) );
        basicUserDto.setStatus( user.getStatus() );

        return basicUserDto;
    }

    @Override
    public Set<BasicUserDto> entitiesToBasicUserDtos(Set<User> users) {
        if ( users == null ) {
            return null;
        }

        Set<BasicUserDto> set = new HashSet<BasicUserDto>( Math.max( (int) ( users.size() / .75f ) + 1, 16 ) );
        for ( User user : users ) {
            set.add( entityToBasicUserDto( user ) );
        }

        return set;
    }

    @Override
    public User requestDtoToEntity(UserRequestDto userRequestDto) {
        if ( userRequestDto == null ) {
            return null;
        }

        User user = new User();

        user.setAdmin( userRequestDto.isAdmin() );
        user.setCredentials( credentialsMapper.dtoToEntity( userRequestDto.getCredentials() ) );
        user.setProfile( profileMapper.dtoToEntity( userRequestDto.getProfile() ) );

        return user;
    }
}
