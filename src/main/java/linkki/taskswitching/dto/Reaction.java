package linkki.taskswitching.dto;

import java.util.Date;

public class Reaction {

    private Long index;
    private Date showTime;
    private Date pressedTime;
    private Long reactionTimeInMs;
    private String pressed;
    private String elementType;
    private Boolean correct;

    public Reaction() {
    }

    public Long getIndex() {
        return index;
    }

    public void setIndex(Long index) {
        this.index = index;
    }

    public Date getShowTime() {
        return showTime;
    }

    public void setShowTime(Date showTime) {
        this.showTime = showTime;
    }

    public Date getPressedTime() {
        return pressedTime;
    }

    public void setPressedTime(Date pressedTime) {
        this.pressedTime = pressedTime;
    }

    public Long getReactionTimeInMs() {
        return reactionTimeInMs;
    }

    public void setReactionTimeInMs(Long reactionTimeInMs) {
        this.reactionTimeInMs = reactionTimeInMs;
    }

    public String getPressed() {
        return pressed;
    }

    public void setPressed(String pressed) {
        this.pressed = pressed;
    }

    public String getElementType() {
        return elementType;
    }

    public void setElementType(String elementType) {
        this.elementType = elementType;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }
}
