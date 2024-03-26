package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.entities.Company;
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
public class CompanyMapperImpl implements CompanyMapper {

    @Autowired
    private TeamMapper teamMapper;
    @Autowired
    private BasicUserMapper basicUserMapper;

    @Override
    public CompanyDto entityToDto(Company company) {
        if ( company == null ) {
            return null;
        }

        CompanyDto companyDto = new CompanyDto();

        companyDto.setDescription( company.getDescription() );
        companyDto.setEmployees( basicUserMapper.entitiesToBasicUserDtos( company.getEmployees() ) );
        companyDto.setId( company.getId() );
        companyDto.setName( company.getName() );
        companyDto.setTeams( teamMapper.entitiesToDtos( company.getTeams() ) );

        return companyDto;
    }

    @Override
    public Set<CompanyDto> entitiesToDtos(Set<Company> companies) {
        if ( companies == null ) {
            return null;
        }

        Set<CompanyDto> set = new HashSet<CompanyDto>( Math.max( (int) ( companies.size() / .75f ) + 1, 16 ) );
        for ( Company company : companies ) {
            set.add( entityToDto( company ) );
        }

        return set;
    }
}
