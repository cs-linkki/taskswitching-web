package linkki.taskswitching.service;

import java.util.List;
import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.dto.TestResult;
import linkki.taskswitching.repository.ParticipantRepository;
import linkki.taskswitching.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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
        if(result.getParticipant() == null || result.getParticipant().getUsername() == null) {
            return;
        }
        
        Participant p = participantRepository.findByUsername(result.getParticipant().getUsername());
        result.setParticipant(p);
        resultRepository.save(result);
    }

    @Transactional(readOnly = true)
    public List<TestResult> list() {
        return resultRepository.findAll();
    }

    @Transactional(readOnly = true)
    public int getCount(String username, String testType, String info) {
        
        if(SecurityContextHolder.getContext().getAuthentication() != null 
                && SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {     
            username = SecurityContextHolder.getContext().getAuthentication().getName();
        }
        
        Participant participant = participantRepository.findByUsername(username);
        if (participant == null) {
            return 0;
        }

        return resultRepository.findByParticipantAndTestTypeAndInfo(participant, testType, info).size();
    }
}
