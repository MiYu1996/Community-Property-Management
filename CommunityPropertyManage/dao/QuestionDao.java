package com.communityprojectmanage.CommunityPropertyManage.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.communityprojectmanage.CommunityPropertyManage.model.*;
import com.communityprojectmanage.CommunityPropertyManage.repository.*;
@Repository
public class QuestionDao {
    @Autowired
	AnnouncementRepository announcementRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    DiscussionRepository discussionRepository;
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    PersonRepository personRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    ResidentRepository residentRepository;
    @Autowired
    StaffRepository staffRepository;

    public void createQuestion(Question question){
        questionRepository.save(question);
    }
    public List<Question> findAllQuestion(){
        List<Question> ret = new ArrayList<>(); 
        for (Question i:questionRepository.findAll())
            ret.add(i);
        return ret;
    }

    public Question findQuestionById(int id){
        return questionRepository.findById(id).get();
    }
}