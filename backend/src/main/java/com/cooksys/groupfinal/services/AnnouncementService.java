package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

	AnnouncementDto createAnnouncement(Long companyId, String username, String title, String description);

}
