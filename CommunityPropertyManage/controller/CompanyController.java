package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.model.Company;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyController {
	
	@Autowired
	private CompanyDao companyDao;

	@RequestMapping(value = "/company", method = RequestMethod.GET)
	public Map<String,Object> getAnnouncements() {
		Map<String,Object> map = new HashMap<>();
		List<String> list = new ArrayList<>();
		list = companyDao.findAllCompany();
		map.put("companyIds", list);		
		return map;
	}
	
	@RequestMapping(value = "/getCompanyById/{companyId}", method = RequestMethod.GET)
	public Company getCompanyById(@PathVariable(value = "companyId") int companyId) {
		Company company = companyDao.findCompanyById(companyId);
		return company;
	}
	
}