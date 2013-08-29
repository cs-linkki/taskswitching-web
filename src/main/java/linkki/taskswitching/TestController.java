/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package linkki.taskswitching;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author avihavai
 */
@Controller
public class TestController {
    @RequestMapping(value = "/test", method = RequestMethod.POST)
    @ResponseBody
    public String logAuthenticatedUserToLogs() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return "";
    }
}
