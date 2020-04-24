package community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomePageController {

	@RequestMapping("/login")		// required = true: require to see the value "error" from URL
	public ModelAndView login(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout) {		// how to check id and password
		ModelAndView modelAndView = new ModelAndView();		
		modelAndView.setViewName("login");
		
		if (error != null) {
			modelAndView.addObject("error", "Invalid Username and Password");		// send "error" to frontend and print
		}																			// the last sentence

		if (logout != null) {
			modelAndView.addObject("logout", "You have logged out successfully");
		}
		
		
		return modelAndView;
		
		return userService.getUserByUsername(userName);
	}

}