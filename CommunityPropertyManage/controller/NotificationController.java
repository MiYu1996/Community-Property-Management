package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.model.Notification;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {
	
	@Autowired
	private NotificationDao notificationDao;

	@RequestMapping(value="/notification", method = RequestMethod.GET)
	public Map<String,Object> map getNotification() {
		Map<String,Object> map = new HashMap<>();
		List<String> list = new ArrayList<>();
		list = notificationDao.findAllNotification();
		map.put("notification", list);
		return map;
	}
}
