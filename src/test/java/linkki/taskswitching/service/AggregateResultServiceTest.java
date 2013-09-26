/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package linkki.taskswitching.service;

import java.util.ArrayList;
import java.util.List;
import linkki.taskswitching.dto.AdditionalKeyPress;
import linkki.taskswitching.dto.Reaction;
import linkki.taskswitching.dto.TestResult;
import linkki.taskswitching.view.AggregateResult;
import org.junit.Test;

/**
 *
 * @author avihavai
 */
public class AggregateResultServiceTest {

    public AggregateResultServiceTest() {
    }

    @Test
    public void testCalculateResult() {
        TestResult tr = new TestResult();
        tr.setTestType("TASKSWITCHING");

        tr.setAdditionalKeyPresses(new ArrayList<AdditionalKeyPress>());

        List<Reaction> reactions = new ArrayList<Reaction>();

        Reaction r = new Reaction();
        r.setCorrect(false);
        r.setShowTime(5.0);
        r.setKeyPressTime(1.0);
        reactions.add(r);

        AggregateResultService ags = new AggregateResultService();
        AggregateResult result = ags.calculateResult(tr);

    }
}