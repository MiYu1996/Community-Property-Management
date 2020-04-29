package com.communityprojectmanage.CommunityPropertyManage.controller;

import java.util.*;

import com.communityprojectmanage.CommunityPropertyManage.model.Person;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
	@RequestMapping(value = "/api/token", method = RequestMethod.POST)
	public Map<String,Object> getToken(@RequestBody Map<String,Object> map) {
		System.err.println(map);
		return map;
	}
	@RequestMapping(value = "/api/hello", method = RequestMethod.GET)
	public Map<String, Object> getToken() {
		Map<String,Object> map = new HashMap<>();
		List<String> list = new ArrayList<>();
		Person person = new Person();
		person.setEnable(true);
		person.setFirstName("sk");
		list.add("hhh");
		list.add("ccc");
		map.put("s1","hello");
		map.put("s2","hashmap");
		map.put("list",list);
		map.put("obj",person);
		return map;
	}
}
