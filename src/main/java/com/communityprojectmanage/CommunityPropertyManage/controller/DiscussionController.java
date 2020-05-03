package com.communityprojectmanage.CommunityPropertyManage.controller;

import com.communityprojectmanage.CommunityPropertyManage.dao.CommentDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.DiscussionDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.NotificationDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.PersonDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Comment;
import com.communityprojectmanage.CommunityPropertyManage.model.Discussion;
import com.communityprojectmanage.CommunityPropertyManage.model.Notification;
import com.communityprojectmanage.CommunityPropertyManage.model.Person;

import java.sql.Timestamp;
import java.util.*;



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
public class DiscussionController {
	@Autowired
	private DiscussionDao discussionDao;
	
	@Autowired
	private PersonDao personDao;
	
	@Autowired
	private CommentDao commentDao;
	
	@Autowired
	private NotificationDao notificationDao;
	
	@RequestMapping(value = "/api/discussion", method = RequestMethod.GET)
	public ResponseEntity<Map<String, List<String>>> getAllDiscussion() {
		Map<String, List<String>> map = new HashMap<>();
		List<Discussion> allDiscussion = discussionDao.findAllDiscussion();
		List<String> allIds = new ArrayList<>();
		for (Discussion ind : allDiscussion) {
			allIds.add(Integer.toString(ind.getId()));
		}
		map.put("discussionIds", allIds);
		return new ResponseEntity<Map<String, List<String>>>(map, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/discussion/{discussionId}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> getDiscussionById(@PathVariable(value = "discussionId") int discussionId) {
		Map<String, Object> map = new HashMap<>();
		try {
			Discussion discussion = discussionDao.findDiscussionById(discussionId);
			map.put("time", discussion.getTime().getTime());
			map.put("author", Integer.toString(discussion.getAuthor().getId()));
			map.put("title", discussion.getSubject());
			map.put("body", discussion.getBody());
			List<Comment> comments = discussion.getComments();
			List<String> commentIds = new ArrayList<>();
			for (Comment ind : comments) {
				commentIds.add(Integer.toString(ind.getId()));
			}
			map.put("commentIds", commentIds);
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		} catch(NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.resolve(404));
		}
	}
	
	@RequestMapping(value = "/api/discussion", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> postDiscussion(@RequestBody Map<String, Object> map) {
		Map<String, Object> response = new HashMap<>();
		Discussion discussion = new Discussion();
		discussion.setSubject((String) map.get("title"));
		discussion.setBody((String) map.get("body"));
		System.out.println(map);
		try {
			discussion.setAuthor(personDao.findPersonById(4));
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.resolve(404));
		}
		discussion.setTime(new Timestamp(System.currentTimeMillis()));
		discussion = discussionDao.createDiscussion(discussion);
		response.put("discussionId", Integer.toString(discussion.getId()));
		
		// Will also generate a notification //
		// Currently only support discussion //
		Notification notification = new Notification();
		Person sender = personDao.findPersonById(4);
		Person receiver = personDao.findPersonById(4);
		notification.setReceiver(sender);
		notification.setSender(receiver);
		notification.setTime(new Timestamp(System.currentTimeMillis()));
		StringBuilder body = new StringBuilder("");
		body.append(sender.getFirstName());
		body.append(" ");
		body.append(sender.getLastName());
		body.append(" just posted a discussion!");
		notification.setBody(body.toString());
		notificationDao.createNotification(notification);
		//
		
		return new ResponseEntity<Map<String, Object>> (response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "api/discussion/{discussionId}", method = RequestMethod.DELETE)
	public ResponseEntity<Map<String, Object>> deleteDiscussion(@PathVariable(value = "discussionId") int discussionId) {
		Map<String, Object> response = new HashMap<>();
		try {
			Discussion deletedDiscussion = discussionDao.findDiscussionById(discussionId);
			List<Comment> deletedComments = deletedDiscussion.getComments();
			for (Comment comment : deletedComments) {
				commentDao.deleteCommentById(comment.getId());
			}
			discussionDao.deleteDiscussionById(discussionId);
			response.put("Delete Success", "");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			response.put("The announcement does not exist", "");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
	}
}
