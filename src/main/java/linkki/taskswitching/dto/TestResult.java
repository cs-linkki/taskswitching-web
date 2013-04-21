package linkki.taskswitching.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class TestResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @ManyToOne
    private Participant participant;
    private String testType;
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date testTime;
    private Double initTime;
    private Double testStartTime;
    private Double testEndTime;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<AdditionalKeyPress> additionalKeyPresses;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Reaction> reactions;

    public TestResult() {
        testTime = new Date();
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

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    public Date getTimestamp() {
        return testTime;
    }

    public void setTimestamp(Date timestamp) {
        this.testTime = timestamp;
    }

    public Double getInitTime() {
        return initTime;
    }

    public void setInitTime(Double initTime) {
        this.initTime = initTime;
    }

    public Double getTestStartTime() {
        return testStartTime;
    }

    public void setTestStartTime(Double testStartTime) {
        this.testStartTime = testStartTime;
    }

    public Double getTestEndTime() {
        return testEndTime;
    }

    public void setTestEndTime(Double testEndTime) {
        this.testEndTime = testEndTime;
    }

    public List<AdditionalKeyPress> getAdditionalKeyPresses() {
        return additionalKeyPresses;
    }

    public void setAdditionalKeyPresses(List<AdditionalKeyPress> additionalKeyPresses) {
        this.additionalKeyPresses = additionalKeyPresses;
    }

    public List<Reaction> getReactions() {
        return reactions;
    }

    public void setReactions(List<Reaction> reactions) {
        this.reactions = reactions;
    }
}
