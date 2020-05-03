package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.communityprojectmanage.CommunityPropertyManage.dao.PersonDao;
import com.communityprojectmanage.CommunityPropertyManage.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class LoginController {
	@Autowired PersonDao personDao;
	@RequestMapping(value = "/api/login", method = RequestMethod.POST)
	public ResponseEntity<Map<String,Object>> Login( @RequestBody Map<String,Object> map) {
		//System.err.println(map.get("expire"));
		Map<String,Object> ret = new HashMap<>();
		String username,password;
		Boolean isLongTerm;
		Person person=null;
		try {
			username=(String) map.get("username");
			password=(String) map.get("password");
			isLongTerm=(boolean) map.get("isLongTerm");
			System.out.println(username);
			System.out.println(password);
			System.out.println(isLongTerm);
			if(username==null||username==""||password==null||password==""||isLongTerm==null) {
				throw new IllegalArgumentException();
			}
		}catch(Exception e) {
			ret.put("reason", "Bad Request.Communication Error or Wrong JSON Format");
			return new ResponseEntity<Map<String,Object>>(ret,HttpStatus.BAD_REQUEST);
		}
		try {
			person = personDao.findPersonByCredentials(username, password);
			if (person == null) {
				ret.put("reason", "NOT_EXIST");
				return new ResponseEntity<Map<String,Object>>(ret,HttpStatus.resolve(401));
			}
			int userId = person.getId();
			if(isLongTerm) {
				ret.put("life", 1209600);
			}else {
				ret.put("life", 600);
			}
			ret.put("token","ee977806d7286510da8b9a7492ba58e2484c0ecc");
			ret.put("userId", userId);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String,Object>>(ret,HttpStatus.resolve(503));
		}
		return new ResponseEntity<Map<String,Object>>(ret,HttpStatus.resolve(200));
	}
}
