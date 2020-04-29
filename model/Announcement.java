package com.communityprojectmanage.CommunityPropertyManage.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "Announcement")

public class Announcement {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String title;
    private String content;
    @ManyToOne
	private Staff poster;
    private Timestamp time;
    
    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
    }
    
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Staff getPoster() {
		return poster;
	}
	public void setPoster(Staff poster) {
		this.poster = poster;
	}
	public Timestamp getTime() {
		return time;
	}
	public void setTime(Timestamp time) {
		this.time = time;
	} 
}
