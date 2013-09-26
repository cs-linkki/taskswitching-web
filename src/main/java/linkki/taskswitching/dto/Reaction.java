package linkki.taskswitching.dto;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Reaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long stimulantIndex;
    private String keyPress;
    private Double keyPressTime;
    private Double showTime;
    private String elementType;
    private Boolean correct;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStimulantIndex() {
        return stimulantIndex;
    }

    public void setStimulantIndex(Long stimulantIndex) {
        this.stimulantIndex = stimulantIndex;
    }

    public String getKeyPress() {
        return keyPress;
    }

    public void setKeyPress(String keyPress) {
        this.keyPress = keyPress;
    }

    public Double getKeyPressTime() {
        return keyPressTime;
    }

    public void setKeyPressTime(Double keyPressTime) {
        this.keyPressTime = keyPressTime;
    }

    public Double getShowTime() {
        return showTime;
    }

    public void setShowTime(Double showTime) {
        this.showTime = showTime;
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
