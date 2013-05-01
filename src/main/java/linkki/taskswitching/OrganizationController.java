package linkki.taskswitching;

import java.util.ArrayList;
import java.util.List;
import linkki.taskswitching.dto.Organization;
import linkki.taskswitching.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping(method = RequestMethod.POST, value = "organization", consumes = "application/json")
    @ResponseBody
    public String post(@RequestBody ArrayList<Organization> organizations) {
        organizationService.createOrUpdateOrDelete(organizations);
        return "ok!";
    }

    @RequestMapping(method = RequestMethod.GET, value = {"organization", "organizations"}, produces = "application/json")
    @ResponseBody
    public List<Organization> list() {
        return organizationService.list();
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "organization/{organizationId}", produces = "application/json")
    @ResponseBody
    public Organization get(Long organizationId) {
        return organizationService.read(organizationId);
    }
}
