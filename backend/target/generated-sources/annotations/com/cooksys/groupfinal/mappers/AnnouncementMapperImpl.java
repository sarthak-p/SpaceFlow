package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
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
public class AnnouncementMapperImpl implements AnnouncementMapper {

    @Autowired
    private BasicUserMapper basicUserMapper;

    @Override
    public AnnouncementDto entityToDto(Announcement announcement) {
        if ( announcement == null ) {
            return null;
        }

        AnnouncementDto announcementDto = new AnnouncementDto();

        announcementDto.setAuthor( basicUserMapper.entityToBasicUserDto( announcement.getAuthor() ) );
        announcementDto.setDate( announcement.getDate() );
        announcementDto.setId( announcement.getId() );
        announcementDto.setMessage( announcement.getMessage() );
        announcementDto.setTitle( announcement.getTitle() );

        return announcementDto;
    }

    @Override
    public Set<AnnouncementDto> entitiesToDtos(Set<Announcement> announcement) {
        if ( announcement == null ) {
            return null;
        }

        Set<AnnouncementDto> set = new HashSet<AnnouncementDto>( Math.max( (int) ( announcement.size() / .75f ) + 1, 16 ) );
        for ( Announcement announcement1 : announcement ) {
            set.add( entityToDto( announcement1 ) );
        }

        return set;
    }
}
