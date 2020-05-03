package com.communityprojectmanage.CommunityPropertyManage.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Table(name = "Company")
public class Company {
	public enum CompanyType {
		LeasingOffice,
		Water,
		Gas,
		Electricity,
		Maintainence,
		Internet,
		ShippingCompany,
		Other
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	@OneToMany(cascade = {CascadeType.ALL})
	private List<Staff> Staffs;
	
	@Enumerated(EnumType.STRING)
	private CompanyType type;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public CompanyType getType() {
		return type;
	}
	public void setType(CompanyType type) {
		this.type = type;
	}
	public List<Staff> getStaffs() {
		return this.Staffs;
	}
	public void setStaffs(List<Staff> staffs) {
		this.Staffs = staffs;
	}
}
