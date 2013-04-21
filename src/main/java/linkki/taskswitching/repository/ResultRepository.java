package linkki.taskswitching.repository;

import linkki.taskswitching.dto.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<TestResult, Long> {
}
