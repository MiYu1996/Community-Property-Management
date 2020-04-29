package com.communityprojectmanage.CommunityPropertyManage.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.communityprojectmanage.CommunityPropertyManage.model.*;
import com.communityprojectmanage.CommunityPropertyManage.repository.*;
@Repository
public class NotificationDao {
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

    public void createNotification(Notification notification){
        notificationRepository.save(notification);
    }
    public List<Notification> findAllNotification(){
        List<Notification> ret = new ArrayList<>(); 
        for (Notification i:notificationRepository.findAll())
            ret.add(i);
        return ret;
    }
}

