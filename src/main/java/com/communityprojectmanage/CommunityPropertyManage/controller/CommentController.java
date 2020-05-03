package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.sql.Timestamp;
import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.dao.CommentDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.DiscussionDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.PersonDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.QuestionDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Comment;
import com.communityprojectmanage.CommunityPropertyManage.model.Discussion;
import com.communityprojectmanage.CommunityPropertyManage.model.Person;
import com.communityprojectmanage.CommunityPropertyManage.model.Person.Role;
import com.communityprojectmanage.CommunityPropertyManage.model.Question;

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
public class CommentController {

	@Autowired
	private CommentDao commentDao;
	@Autowired
	private PersonDao personDao;
	@Autowired
	private DiscussionDao discussionDao;
	@Autowired
	private QuestionDao questionDao;

	@RequestMapping(value = "/api/comment/{commentId}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> getComment(@PathVariable(value = "commentId") int commentId) {
		Map<String, Object> map = new HashMap<>();
		try {
			Comment comment = commentDao.findCommentById(commentId);
			map.put("time", comment.getTime());
			map.put("author", Integer.toString(comment.getAuthor().getId()));
			map.put("body", comment.getBody());
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/api/comment/{commentId}", method = RequestMethod.DELETE)
	public ResponseEntity<Map<String, Object>> deleteComment(@PathVariable(value = "commentId") int commentId) {
		Map<String, Object> response = new HashMap<>();
		try {
			// Delete comments from the other table as well //
			Comment comment = commentDao.findCommentById(commentId);
			int parentId = comment.getDisQuesId();
			if (comment.getType().equals("Discussion")) {
				Discussion discussion = discussionDao.findDiscussionById(parentId);
				List<Comment> allComments = discussion.getComments();
				allComments.remove(comment);
				discussion.setComments(allComments);
				discussionDao.createDiscussion(discussion);
			} else {
				Question question = questionDao.findQuestionById(parentId);
				if (comment.getAuthor().getRole() == Role.LeasingOffice) {
					List<Comment> allComments = question.getLeasingOfficeReply();
					allComments.remove(comment);
					question.setLeasingOfficeReply(allComments);
				}
				else {
					List<Comment> allComments = question.getThirdPartyReply();
					allComments.remove(comment);
					question.setThirdPartyReply(allComments);
				}
				questionDao.createQuestion(question);
			}
			commentDao.deleteCommentById(commentId);
			response.put("Delete Success", "");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			response.put("The announcement does not exist", "");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.resolve(404));
		}
	}

	@RequestMapping(value = "/api/discussion/{discussionId}", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> addDiscussionComment(@RequestBody Map<String, Object> map,
			@PathVariable(value = "discussionId") int discussionId) {
		Map<String, Object> response = new HashMap<>();
		Comment comment = new Comment();
		comment.setBody((String) map.get("body"));
		comment.setTime(new Timestamp(System.currentTimeMillis()));
		comment.setDisQuesId(discussionId);
		comment.setType("Discussion");
		try {
			comment.setAuthor(personDao.findPersonById(7));
		} catch (NullPointerException e) {
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {
			Discussion discussion = discussionDao.findDiscussionById(discussionId);
			List<Comment> comments = discussion.getComments();
			comments.add(comment);
			discussion.setComments(comments);
			discussionDao.createDiscussion(discussion);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		comment = commentDao.createDiscussionComment(comment);
		response.put("commentId", comment.getId());
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/question/{questionId}/reply", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> addQuuestionReply(@RequestBody Map<String, Object> map,
			@PathVariable(value = "questionId") int questionId) {
		Map<String, Object> response = new HashMap<>();
		Comment comment = new Comment();
		comment.setBody((String) map.get("body"));
		comment.setTime(new Timestamp(System.currentTimeMillis()));
		comment.setDisQuesId(questionId);
		comment.setType("Question");
		try {
			comment.setAuthor(personDao.findPersonById(7));
		} catch (NullPointerException e) {
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		Person author = personDao.findPersonById(7);
		try {
			Question question = questionDao.findQuestionById(questionId);
			if (author.getRole() == Role.LeasingOffice) {
				List<Comment> lOReply = question.getLeasingOfficeReply();
				lOReply.add(comment);
				question.setLeasingOfficeReply(lOReply);
				questionDao.createQuestion(question);
			} else if (author.getRole() == Role.ThirdParty) {
				List<Comment> tPReply = question.getThirdPartyReply();
				tPReply.add(comment);
				question.setThirdPartyReply(tPReply);
				questionDao.createQuestion(question);
			}
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		comment = commentDao.createQuestionComment(comment);
		response.put("commentId", comment.getId());
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}