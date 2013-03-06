package linkki.taskswitching.dto;

import java.util.Date;
import java.util.List;

public class TestResult {

    private Long id;
    private Participant participant;
    private String testType;
    private Date initTime;
    private Date testStartTime;
    private Date testEndTime;
    private List<AdditionalKeyPress> additionalKeyPresses;
    private List<Reaction> reactions;

    public TestResult() {
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

    public Date getInitTime() {
        return initTime;
    }

    public void setInitTime(Date initTime) {
        this.initTime = initTime;
    }

    public Date getTestStartTime() {
        return testStartTime;
    }

    public void setTestStartTime(Date testStartTime) {
        this.testStartTime = testStartTime;
    }

    public Date getTestEndTime() {
        return testEndTime;
    }

    public void setTestEndTime(Date testEndTime) {
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
