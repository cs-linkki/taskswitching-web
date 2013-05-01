package linkki.taskswitching.service;

import java.util.List;
import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.dto.TestResult;
import linkki.taskswitching.repository.ParticipantRepository;
import linkki.taskswitching.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ResultService {

    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private ResultRepository resultRepository;

    @Transactional(readOnly = false)
    public void save(TestResult result) {
        Participant p = participantRepository.findOne(result.getParticipant().getId());
        if (p == null) {
            p = participantRepository.save(result.getParticipant());
            result.setParticipant(p);
        }

        resultRepository.save(result);
    }

    @Transactional(readOnly = true)
    public List<TestResult> list() {
        return resultRepository.findAll();
    }

    @Transactional(readOnly = true)
    public int getCount(Long participantId, String testType) {
        Participant participant = participantRepository.findOne(participantId);
        if (participant == null) {
            return 0;
        }

        return resultRepository.findByParticipantAndTestType(participant, testType).size();
    }
}
