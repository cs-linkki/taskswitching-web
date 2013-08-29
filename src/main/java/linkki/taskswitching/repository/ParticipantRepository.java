
package linkki.taskswitching.repository;

import linkki.taskswitching.dto.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Participant findByUsername(String username);
    Participant findByUsernameAndPassword(String username, String password);
}
