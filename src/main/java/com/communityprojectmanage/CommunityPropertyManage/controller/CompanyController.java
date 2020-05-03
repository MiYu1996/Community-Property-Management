package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.dao.CompanyDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.StaffDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Company;
import com.communityprojectmanage.CommunityPropertyManage.model.Staff;

import javax.net.ssl.SSLEngineResult.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class CompanyController {

	@Autowired
	private CompanyDao companyDao;

	@RequestMapping(value = "/api/company", method = RequestMethod.GET)
	public ResponseEntity<Map<String, List<String>>> getCompany() {
		Map<String, List<String>> map = new HashMap<>();
		List<String> allIds = new ArrayList<>();
		List<Company> list = new ArrayList<>();
		list = companyDao.findAllCompany();
		for (Company ind : list) {
			allIds.add(Integer.toString(ind.getId()));
		}
		map.put("companyIds", allIds);
		return new ResponseEntity<Map<String, List<String>>>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/getCompanyById/{companyId}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> getCompanyById(@PathVariable(value = "companyId") int companyId) {
		Map<String, Object> map = new HashMap<>();
		try {
			Company company = companyDao.findCompanyById(companyId);
			List<Staff> allStaffs = company.getStaffs();
			List<String> allStaffIds = new ArrayList<>();
			for (Staff ind : allStaffs) {
				allStaffIds.add(Integer.toString(ind.getId()));
			}
			map.put("type", company.getType());
			map.put("name", company.getName());
			map.put("staff", allStaffIds);
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.NOT_FOUND);
		}
	}

}
