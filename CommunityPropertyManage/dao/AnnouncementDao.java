package com.communityprojectmanage.CommunityPropertyManage.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.communityprojectmanage.CommunityPropertyManage.model.*;
import com.communityprojectmanage.CommunityPropertyManage.repository.*;
@Repository
public class AnnouncementDao {
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
    
    public void createAnnouncement(Announcement announcement){
        announcementRepository.save(announcement);
    }
    public List<Announcement> findAllAnnouncement(){
        List<Announcement> ret = new ArrayList<>(); 
        for (Announcement i:announcementRepository.findAll())
            ret.add(i);
        return ret;
    }
    public Announcement findAnnouncementById(int id){
        return announcementRepository.findById(id).get();
    }
    public void deleteAnnouncementById(int id){
        announcementRepository.deleteById(id);
    }


}