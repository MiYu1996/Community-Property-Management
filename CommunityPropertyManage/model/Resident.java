package com.communityprojectmanage.CommunityPropertyManage.model;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class Resident extends Person{
	private String roomNum;
	Date MoveInDate;
	
	public String getRoomNum() {
		return roomNum;
	}
	
	public void setRoomNum(String roomNum) {
		this.roomNum = roomNum;
	}
	
	public Date getMoveInDate() {
		return MoveInDate;
	}
	public void setMoveInDate(Date moveInDate) {
		MoveInDate = moveInDate;
	}
	
}
