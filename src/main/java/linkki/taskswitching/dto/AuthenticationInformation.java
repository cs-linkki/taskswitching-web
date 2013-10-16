package linkki.taskswitching.dto;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class AuthenticationInformation implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    @JoinColumn
    @ManyToOne
    private Participant participant;
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date authenticationTime;
    private String metadata;
    @Lob
    private String details;

    public AuthenticationInformation() {
        super();
    }

    public AuthenticationInformation(Participant participant, String details, String metadata) {
        this();
        this.participant = participant;
        this.authenticationTime = new Date();
        this.details = details;
        this.metadata = metadata;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public Date getAuthenticationTime() {
        return authenticationTime;
    }

    public void setAuthenticationTime(Date authenticationTime) {
        this.authenticationTime = authenticationTime;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    @Override
    public String toString() {
        return "AuthenticationInformation{" + "participant=" + participant + ", authenticationTime=" + authenticationTime + ", details=" + details + '}';
    }
}
