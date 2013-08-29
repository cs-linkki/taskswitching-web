
package linkki.taskswitching;

import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ParticipantController {
    
    @Autowired
    private ParticipantService participantService;
    
    @RequestMapping(method = RequestMethod.GET, value = "p")
    @ResponseBody
    public Participant createOrLogin(@RequestParam String participantId) {
        participantService.createParticipant();
        return null;
    }
}
