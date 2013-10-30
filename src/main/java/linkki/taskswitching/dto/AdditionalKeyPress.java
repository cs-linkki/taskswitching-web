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
    private Integer place;
    private Integer chainLength;
    private Integer lastSeries;

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

    public Integer getPlace() {
        return place;
    }

    public void setPlace(Integer place) {
        this.place = place;
    }

    public Integer getChainLength() {
        return chainLength;
    }

    public void setChainLength(Integer chainLength) {
        this.chainLength = chainLength;
    }

    public Integer getLastSeries() {
        return lastSeries;
    }

    public void setLastSeries(Integer lastSeries) {
        this.lastSeries = lastSeries;
    }
}
