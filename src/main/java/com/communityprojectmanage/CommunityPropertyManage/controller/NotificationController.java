package com.communityprojectmanage.CommunityPropertyManage.controller;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.communityprojectmanage.CommunityPropertyManage.dao.NotificationDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Notification;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class NotificationController {
	@Autowired
	NotificationDao notificationDao;
	
	@RequestMapping(value = "/api/notification", method = RequestMethod.GET)
	public ResponseEntity<Map<String, List<Map<String, Object>>>> getNotifications() {
		// Here we make a dummy, John Smith always receive notifications //
		int receiver_id = 4;
		Map<String, List<Map<String, Object>>> response = new HashMap<>();
		response.put("notifications", new ArrayList<Map<String, Object>>());
			List<Notification> notifications = notificationDao.findAllNotification(); 
			for (Notification notification : notifications) {
				if (notification.getReceiver().getId() == receiver_id) {
					Map<String, Object> newMap = new HashMap<>();
					newMap.put("time", notification.getTime().getTime());
					newMap.put("sender", Integer.toString(notification.getSender().getId()));
					
					// Now body is just string
					//Map<String, Object> newBody = new HashMap<>();
					//newBody.put("type", "Generated Message");
					//newBody.put("discussionId", "1234");
					//newBody.put("body", notification.getBody());
					//newMap.put("body", newBody);
					
					newMap.put("body", notification.getBody());
					List<Map<String, Object>> list = response.get("notifications");
					list.add(newMap);
					response.put("notifications", list);
				}
			}
			return new ResponseEntity<Map<String, List<Map<String, Object>>>>(response, HttpStatus.OK);
	}
}
