package linkki.taskswitching.repository;

import linkki.taskswitching.dto.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
}
