package com.communityprojectmanage.CommunityPropertyManage.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.communityprojectmanage.CommunityPropertyManage.model.*;
import com.communityprojectmanage.CommunityPropertyManage.repository.*;
@Repository
public class ResidentDao {
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

    public Resident createResident(Resident resident){
        return residentRepository.save(resident);
    }

    public Resident findResidentById(int id){
        return residentRepository.findById(id).get();
    }
}