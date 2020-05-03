package com.communityprojectmanage.CommunityPropertyManage.controller;
import java.sql.Timestamp;
import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.dao.AnnouncementDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.StaffDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Announcement;
import com.communityprojectmanage.CommunityPropertyManage.model.Person;
import com.communityprojectmanage.CommunityPropertyManage.model.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class AnnouncementController {
	@Autowired
	private AnnouncementDao announcementDao; 
	@Autowired
	private StaffDao staffDao;
	
	@RequestMapping(value = "/api/announcement", method = RequestMethod.GET)
	public ResponseEntity<Map<String, List<String>>> getAllAnnouncement() {
		Map<String, List<String>> map = new HashMap<>();
		List<Announcement> allAnnouncements = announcementDao.findAllAnnouncement();
		List<String> allIds = new ArrayList<>();
		for (Announcement ind : allAnnouncements) {
			allIds.add(Integer.toString(ind.getId()));
		}
		map.put("announcementIds", allIds);
		return new ResponseEntity<Map<String, List<String>>>(map, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/announcement/{announcementId}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> getAnnounceById(@PathVariable(value = "announcementId") int annoucenmentId) {
		Map<String, Object> map = new HashMap<>();
		try {
			Announcement announcement = announcementDao.findAnnouncementById(annoucenmentId);
			map.put("time", announcement.getTime().getTime());
			map.put("author", announcement.getPoster());
			map.put("title", announcement.getTitle());
			map.put("body", announcement.getContent());
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/api/announcement", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> postAnnouncement(@RequestBody Map<String, Object> map) {
		Map<String, Object> response = new HashMap<>();
		Announcement announcement = new Announcement();
		announcement.setTitle((String)map.get("title"));
		announcement.setContent((String) map.get("body"));
		try {
			announcement.setPoster(staffDao.findStaffById(4));
		} catch(NullPointerException e) {
			response.put("Unauthorized User", "");
			System.err.println("Unauthorized User");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.resolve(403));
		}
		announcement.setTime(new Timestamp(System.currentTimeMillis()));
		announcement = announcementDao.createAnnouncement(announcement);
		response.put("announcementId", Integer.toString(announcement.getId()));
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/announcement/{announcementId}", method = RequestMethod.DELETE)
	public ResponseEntity<Map<String, Object>> deleteAnnouncement(@PathVariable(value = "announcementId") int annoucenmentId) {
		Map<String, Object> response = new HashMap<>();
		try {
			announcementDao.deleteAnnouncementById(annoucenmentId);
			response.put("Delete Success", "");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			response.put("The announcement does not exist", "");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.resolve(404));
		}
	}
} 
