package linkki.taskswitching.dto;

import java.util.List;

public class TestResult {

    private Long id;
    private Participant participant;
    private String testType;
    private Double initTime;
    private Double testStartTime;
    private Double testEndTime;
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
