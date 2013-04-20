
package linkki.taskswitching;

import java.util.ArrayList;
import java.util.List;
import linkki.taskswitching.dto.TestResult;
import linkki.taskswitching.service.ParticipantService;
import linkki.taskswitching.view.AggregateResult;
import linkki.taskswitching.view.DataTablesOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ParticipantController {
    
    @Autowired
    private ParticipantService participantService;
    
    @RequestMapping(method = RequestMethod.GET, value = "p")
    @ResponseBody
    public String create() {
        participantService.createParticipant();
        return "done";
    }
}
