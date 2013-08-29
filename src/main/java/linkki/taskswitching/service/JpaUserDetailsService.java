package linkki.taskswitching.service;

import java.util.ArrayList;
import java.util.List;
import javax.management.relation.Role;
import linkki.taskswitching.dto.Participant;
import linkki.taskswitching.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("RETRIEVING USERDETAILS FOR " + username);
        if(username.equals("test")) {
            throw new UsernameNotFoundException("No such username: " + username);
        }
        
        Participant participant = participantRepository.findByUsername(username);
        if(participant == null) {
            participant = new Participant();
            participant.setUsername(username);
            participant.setPassword("salainen");
            participant = participantRepository.save(participant);
            participantRepository.flush();
        }

        return new org.springframework.security.core.userdetails.User(
                participant.getUsername(),
                participant.getPassword(),
                true,
                true,
                true,
                true,
                getRolesAsGrantedAuthorities());
    }

    private List<GrantedAuthority> getRolesAsGrantedAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }
}
