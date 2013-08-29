package linkki.taskswitching.repository;

import linkki.taskswitching.dto.AuthenticationInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationInformationRepository extends JpaRepository<AuthenticationInformation, Long> {
}
