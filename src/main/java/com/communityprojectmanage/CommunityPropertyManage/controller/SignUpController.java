package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.communityprojectmanage.CommunityPropertyManage.dao.PersonDao;
import com.communityprojectmanage.CommunityPropertyManage.model.Person;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class SignUpController {
	@Autowired PersonDao personDao;
	@RequestMapping(value = "/api/signup", method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> signUp(@RequestBody Map<String,Object> map){
		Map<String,Object> ret = new HashMap<>();
		try {
		Person person = new Person();
		person.setEnable(true);
		person.setUsername((String)map.get("username"));
		person.setPassword((String)map.get("password"));
		person=personDao.createPerson(person);
		
		ret.put("userId", person.getId());
		}catch(Exception e) {
			ret.put("reason", "BAD_USERNAME");
			return new ResponseEntity<Map<String,Object>>(ret,HttpStatus.resolve(400));
		}
		return new ResponseEntity<Map<String,Object>>(ret,HttpStatus.resolve(200));
	}
}
