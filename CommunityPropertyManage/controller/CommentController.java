package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.model.Comment;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentController {
	
	@Autowired
	private CommentDao commentDao;

	@RequestMapping(value="/comment/{commentId}", method = RequestMethod.GET)
	public Comment getComment(@PathVariable(value = "commentId") int commentId) {
		Comment comment = commentDao.findCommentById(commentId);;
		return comment;
	}
	
	@RequestMapping(value="/api/comment/{commentId}", method = RequestMethod.DELETE)
	public Comment deleteComment(@PathVariable int commentId) {
		Comment comment = commentDao.deleteCommentById(commentId);
		return comment;
	}
	
	@RequestMapping(value="/api/discussion/{discussionId}", method = RequestMethod.POST)
	public Comment addDiscussionComment(@PathVariable int discussionId, Comment newComment) {
		Comment comment = commentDao.createDiscussionComment(newComment);		
		return comment;
	}
	
	@RequestMapping(value="/question/{questionId}/reply", method = RequestMethod.POST)
	public Comment addQuestionComment(@PathVariable int questionId, Comment newComment) {
		Comment comment = commentDao.createQuestionComment(newComment);		
		return comment;
	}
}
