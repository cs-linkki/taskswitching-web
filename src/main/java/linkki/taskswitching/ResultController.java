package linkki.taskswitching;

import linkki.taskswitching.view.DataTablesOutput;
import linkki.taskswitching.dto.TestResult;
import java.util.ArrayList;
import java.util.List;
import linkki.taskswitching.view.AggregateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ResultController {
    
    @Autowired
    private ResultService resultService;
    
    private List<TestResult> results = new ArrayList<TestResult>();
    
    @RequestMapping(method = RequestMethod.POST, value = "result", consumes = "application/json")
    @ResponseBody
    public AggregateResult postResult(@RequestBody TestResult result) {
        results.add(result);        
        return resultService.calculateResult(result);
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "result", produces = "application/json")
    @ResponseBody
    public DataTablesOutput getResults() {
        DataTablesOutput output = new DataTablesOutput();
        List<AggregateResult> aggResults = new ArrayList<AggregateResult>();
        for (TestResult testResult : results) {
            aggResults.add(resultService.calculateResult(testResult));
        }
        
        output.setAaData(aggResults);
        return output;
    }    
}
