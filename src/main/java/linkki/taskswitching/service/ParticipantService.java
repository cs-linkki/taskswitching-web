package linkki.taskswitching.service;

import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Transactional
    public void createParticipant() {
        participantRepository.save(new Participant());
    }
}
