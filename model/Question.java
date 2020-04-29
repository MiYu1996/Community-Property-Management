package com.communityprojectmanage.CommunityPropertyManage.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "Question")
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String Subject;
	private String body;
	private String LeasingOfficeReply;
	private Timestamp time;
	@ManyToOne
	private Resident author;
	private boolean isSolved;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSubject() {
		return Subject;
	}
	public void setSubject(String subject) {
		Subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getLeasingOfficeReply() {
		return LeasingOfficeReply;
	}
	public void setLeasingOfficeReply(String leasingOfficeReply) {
		LeasingOfficeReply = leasingOfficeReply;
	}
	public Timestamp getTime() {
		return time;
	}
	public void setTime(Timestamp time) {
		this.time = time;
	}
	public Resident getAuthor() {
		return author;
	}
	public void setAuthor(Resident author) {
		this.author = author;
	}
	public boolean isSolved() {
		return isSolved;
	}
	public void setSolved(boolean isSolved) {
		this.isSolved = isSolved;
	}
}
