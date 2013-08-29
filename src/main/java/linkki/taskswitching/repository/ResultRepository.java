package linkki.taskswitching.repository;

import java.util.List;
import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.dto.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<TestResult, Long> {

    List<TestResult> findByParticipantAndTestTypeAndInfo(Participant participant, String testType, String info);
}
