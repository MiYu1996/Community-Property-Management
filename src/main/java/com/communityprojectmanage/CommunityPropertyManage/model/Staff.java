package com.communityprojectmanage.CommunityPropertyManage.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@Entity
public class Staff extends Person{
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
	
	String CompanyName;
	
	@Enumerated(EnumType.STRING)
	CompanyType type;
	@ManyToOne(cascade = {CascadeType.ALL})
	Company company;
	
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
}
