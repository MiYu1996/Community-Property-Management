package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.communityprojectmanage.CommunityPropertyManage.dao.PersonDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.ResidentDao;
import com.communityprojectmanage.CommunityPropertyManage.dao.StaffDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Company;
import com.communityprojectmanage.CommunityPropertyManage.model.Person;
import com.communityprojectmanage.CommunityPropertyManage.model.Person.Role;
import com.communityprojectmanage.CommunityPropertyManage.model.Resident;
import com.communityprojectmanage.CommunityPropertyManage.model.Staff;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class UserController {
	@Autowired 
	private PersonDao personDao;
	@Autowired 
	private StaffDao staffDao;
	@Autowired 
	private ResidentDao residentDao;
	
	@RequestMapping(value = "/api/{userId}", method = RequestMethod.GET)
	public ResponseEntity<Person> getToken(@PathVariable("userId") Integer id,@RequestParam(value="token") String tokenUrl, @RequestParam(value="expire") int expireURL) {
		Person ret = personDao.findPersonById(id);
		System.err.println(tokenUrl);
		System.err.println(expireURL);

		return new ResponseEntity<Person>(ret,HttpStatus.resolve(200));
	}
	
	@RequestMapping(value = "/api/user/{userId}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> getUserInformation(@PathVariable(value = "userId") int userId) {
		Map<String, Object> map = new HashMap<>();
		try {
			Person person = personDao.findPersonById(userId);
			Role role = person.getRole();
			if (role == Role.Resident) {
				map.put("type", "resident");
			}
			else if (role == Role.LeasingOffice) {
				map.put("type", "leasing office");
			}
			else {
				map.put("type", "staff");
			}
			map.put("avatar", "");
			map.put("username", person.getUsername());
			map.put("firstName", person.getFirstName());
			map.put("lastName", person.getLastName());
			map.put("email", person.getEmailid());
			
			Map<String, String> phoneMap = new HashMap<>();
			phoneMap.put("primary",person.getPhoneNumber());
			phoneMap.put("mobile",person.getPhoneNumber());
			
			map.put("phone", phoneMap);
			map.put("birthday", person.getBirthday().getTime());
			if (map.get("type").equals("resident")) {
				Resident resident = residentDao.findResidentById(userId);
				map.put("room", resident.getRoomNum());
				map.put("moveinDate", resident.getMoveInDate());
			}
			else {
				Staff staff = staffDao.findStaffById(userId);
				Company company = staff.getCompany();
				map.put("companyId", Integer.toString(company.getId()));
			}
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.NOT_FOUND);
		}
	}
	
}