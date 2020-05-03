package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.model.Person;

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
public class AuthenticationController {
	@RequestMapping(value = "/api/token", method = RequestMethod.GET)
	public ResponseEntity<Map<String,Object>> getToken(@RequestParam(value="token") String tokenUrl, @RequestParam(value="expire") int expireURL, @RequestBody Map<String,Object> map) {
		System.err.println(tokenUrl);
		System.err.println(expireURL);
		map.put("token","917cee1fa652528d12779ba63666cb29095475ff");
		return new ResponseEntity<Map<String,Object>>(map,HttpStatus.resolve(200));
	}
	
	@RequestMapping(value = "/api/hello", method = RequestMethod.GET)
	public ResponseEntity<Person> getToken() {
		Map<String,Object> map = new HashMap<>();
		Map<String,Object> map2 = new HashMap<>();
		List<String> list = new ArrayList<>();
		Person person = new Person();
		person.setEnable(true);
		person.setFirstName("sk");
		list.add("hhh");
		list.add("ccc");
		map2.put("s10","qqq");
		map2.put("s11","asdas");
		map.put("s1","hello");
		map.put("s2","hashmap");
		map.put("list",list);
		map.put("obj",person);
		map.put("obj2",map2);
		return new ResponseEntity<Person>(person,HttpStatus.GATEWAY_TIMEOUT);
	}
}

