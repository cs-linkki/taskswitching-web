package linkki.taskswitching.dto;

import java.io.Serializable;
import javax.persistence.Entity;
import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
public class Reaction extends AbstractPersistable<Long> implements Serializable {

    private Long reactionIndex;
    private Double showTime;
    private Double pressedTime;
    private String pressed;
    private String elementType;
    private Boolean correct;

    public Reaction() {
    }

    public Long getReactionIndex() {
        return reactionIndex;
    }

    public void setReactionIndex(Long index) {
        this.reactionIndex = index;
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
