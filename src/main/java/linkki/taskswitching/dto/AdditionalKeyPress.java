package linkki.taskswitching.dto;

import java.io.Serializable;
import javax.persistence.Entity;
import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
public class AdditionalKeyPress extends AbstractPersistable<Long> implements Serializable {

    private Long stimulantIndex;
    private String keyPress;
    private Double keyPressTime;

    public AdditionalKeyPress() {
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
