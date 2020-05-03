package com.communityprojectmanage.CommunityPropertyManage.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "Question")
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String Subject;
	private String body;
	@OneToMany(cascade = {CascadeType.ALL})
	private List<Comment> leasingOfficeReply;
	@OneToMany(cascade = {CascadeType.ALL})
	private List<Comment> thirdPartyReply;
	private Timestamp time;
	@ManyToOne(cascade = {CascadeType.ALL})
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
	public List<Comment> getLeasingOfficeReply() {
		return leasingOfficeReply;
	}
	public void setLeasingOfficeReply(List<Comment> leasingOfficeReply) {
		this.leasingOfficeReply = leasingOfficeReply;
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
	public void setThirdPartyReply(List<Comment> thirdPartyReply) {
		this.thirdPartyReply = thirdPartyReply;
	}
	public List<Comment> getThirdPartyReply() {
		return thirdPartyReply;
	}
}
