
package linkki.taskswitching;

import linkki.taskswitching.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ListController {
    @Autowired
    private ResultService resultService;
    
    @RequestMapping("listcount")
    @ResponseBody
    public int getCountOfShownLists(@RequestParam Long participantId, @RequestParam String testType) {
        return resultService.getCount(participantId, testType);
    }
}
