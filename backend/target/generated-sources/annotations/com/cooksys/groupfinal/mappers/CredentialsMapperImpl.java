package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.entities.Credentials;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-26T13:38:11-0500",
    comments = "version: 1.4.1.Final, compiler: Eclipse JDT (IDE) 3.37.0.v20240206-1609, environment: Java 17.0.10 (Eclipse Adoptium)"
)
@Component
public class CredentialsMapperImpl implements CredentialsMapper {

    @Override
    public Credentials dtoToEntity(CredentialsDto credentialsDto) {
        if ( credentialsDto == null ) {
            return null;
        }

        Credentials credentials = new Credentials();

        credentials.setPassword( credentialsDto.getPassword() );
        credentials.setUsername( credentialsDto.getUsername() );

        return credentials;
    }
}
