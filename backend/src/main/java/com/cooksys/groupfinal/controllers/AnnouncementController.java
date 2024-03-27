package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@PostMapping("/{companyId}/{username}/{title}/{description}")
	public AnnouncementDto createAnnouncement(@PathVariable("companyId") Long companyId, @PathVariable("username") String username, @PathVariable("title") String title, @PathVariable("description") String description) {
		return announcementService.createAnnouncement(companyId, username, title, description);
	}

}
