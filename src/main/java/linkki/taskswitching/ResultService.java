package linkki.taskswitching;

import linkki.taskswitching.dto.Reaction;
import linkki.taskswitching.dto.TestResult;
import linkki.taskswitching.view.AggregateResult;
import org.springframework.stereotype.Service;

@Service
public class ResultService {

    public AggregateResult calculateResult(TestResult result) {
        AggregateResult aggregateResult = new AggregateResult();
        if(result.getReactions() == null) {
            return aggregateResult;
        }

        double correct = 0;
        double reactionTime = 0;
        for (Reaction reaction : result.getReactions()) {
            if (reaction.getCorrect() == null || !reaction.getCorrect()) {
                continue;
            }

            reactionTime += reaction.getReactionTimeInMs();
            correct++;
        }

        aggregateResult.setParticipantId(result.getParticipant().getId());
        aggregateResult.setTestType(result.getTestType());
        aggregateResult.setHitsPercentage(100.0 * correct / result.getReactions().size());
        aggregateResult.setReactionTime(Math.round(reactionTime / correct));

        return aggregateResult;

    }
}
