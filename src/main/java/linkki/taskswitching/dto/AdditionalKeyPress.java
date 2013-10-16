package linkki.taskswitching.dto;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AdditionalKeyPress implements Serializable {

    @Id
    @GeneratedValue
    private Long id;
    private Long stimulantIndex;
    private String keyPress;
    private Double keyPressTime;

    public AdditionalKeyPress() {
    }

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
}
