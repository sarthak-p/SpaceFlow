package com.cooksys.groupfinal.services.impl;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;
	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;
	@Override
	public AnnouncementDto createAnnouncement(Long companyId, String username, String title, String description) {
		if(!companyRepository.existsById(companyId)) {
			throw new NotFoundException("No such company with ID exists");
		}
		
		if(userRepository.findByCredentialsUsernameAndActiveTrue(username).isEmpty()) {
			throw new NotFoundException("No active user with given username");
		}
		
		Company company = companyRepository.findById(companyId).get();
		User author = userRepository.findByCredentialsUsernameAndActiveTrue(username).get();
		Announcement announcement = new Announcement();
		announcement.setAuthor(author);
		
		announcement.setCompany(company);
		
		announcement.setTitle(title);
		
		announcement.setMessage(description);
		
		announcementRepository.saveAndFlush(announcement);
		
		Set<Announcement> announcements = company.getAnnouncements();
		
		announcements.add(announcement);
		
		company.setAnnouncements(announcements);
		
		announcements = author.getAnnouncements();
		
		announcements.add(announcement);
		
		author.setAnnouncements(announcements);
		
		return announcementMapper.entityToDto(announcement);
	}

}