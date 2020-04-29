package com.communityprojectmanage.CommunityPropertyManage.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.communityprojectmanage.CommunityPropertyManage.model.*;
import com.communityprojectmanage.CommunityPropertyManage.repository.*;
@Repository
public class DiscussionDao {
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

    public void createDiscussion(Discussion discussion){
        discussionRepository.save(discussion);
    }
    public List<Discussion> findAllDiscussion(){
        List<Discussion> ret = new ArrayList<>(); 
        for (Discussion i:discussionRepository.findAll())
            ret.add(i);
        return ret;
    }
    public Discussion findDiscussionById(int id){
        return discussionRepository.findById(id).get();
    }
    public void deleteDiscussionById(int id){
        discussionRepository.deleteById(id);
    }
}