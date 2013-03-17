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
    private int hitsOutsideTimespan;
    
    private double hitsRepeated;
    private double hitsChanged;
    private double repeatedReactionTime;
    private double changedReactionTime;

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

    public int getHitsOutsideTimespan() {
        return hitsOutsideTimespan;
    }

    public void setHitsOutsideTimespan(int hitsOutsideTimespan) {
        this.hitsOutsideTimespan = hitsOutsideTimespan;
    }

    public double getHitsRepeated() {
        return hitsRepeated;
    }

    public void setHitsRepeated(double hitsRepeated) {
        this.hitsRepeated = hitsRepeated;
    }

    public double getHitsChanged() {
        return hitsChanged;
    }

    public void setHitsChanged(double hitsChanged) {
        this.hitsChanged = hitsChanged;
    }

    public double getRepeatedReactionTime() {
        return repeatedReactionTime;
    }

    public void setRepeatedReactionTime(double repeatedReactionTime) {
        this.repeatedReactionTime = repeatedReactionTime;
    }

    public double getChangedReactionTime() {
        return changedReactionTime;
    }

    public void setChangedReactionTime(double changedReactionTime) {
        this.changedReactionTime = changedReactionTime;
    }
}
