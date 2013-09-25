package linkki.taskswitching.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.xml.bind.annotation.XmlRootElement;
import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
@XmlRootElement
public class Participant extends AbstractPersistable<Long> implements Serializable {

    private String username;
    @JsonIgnore
    private String password;

    public Participant() {
        super();
    }

    @Override
    public Long getId() {
        return super.getId(); //To change body of generated methods, choose Tools | Templates.
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
