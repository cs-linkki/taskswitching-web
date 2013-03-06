/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package linkki.taskswitching.view;

/**
 *
 * @author arto
 */
public class AggregateResult {

    private int participantId;
    private String testType;
    private double hitsPercentage;
    private double reactionTime;

    public AggregateResult() {
    }

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    public double getHitsPercentage() {
        return hitsPercentage;
    }

    public void setHitsPercentage(double hitsPercentage) {
        this.hitsPercentage = hitsPercentage;
    }

    public double getReactionTime() {
        return reactionTime;
    }

    public void setReactionTime(double reactionTime) {
        this.reactionTime = reactionTime;
    }
}
