package linkki.taskswitching.dto;

public class Reaction {

    private Long index;
    private Double showTime;
    private Double pressedTime;
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

    public Double getShowTime() {
        return showTime;
    }

    public void setShowTime(Double showTime) {
        this.showTime = showTime;
    }

    public Double getPressedTime() {
        return pressedTime;
    }

    public void setPressedTime(Double pressedTime) {
        this.pressedTime = pressedTime;
    }

    public Double getReactionTimeInMs() {
        return pressedTime - showTime;
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
