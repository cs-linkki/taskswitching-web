package linkki.taskswitching.dto;

import java.io.Serializable;
import javax.persistence.Entity;
import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
public class AdditionalKeyPress extends AbstractPersistable<Long> implements Serializable {

    private Long lastIndex;
    private String keyPressed;
    private Double keyPressTime;

    public AdditionalKeyPress() {
    }

    public Long getLastIndex() {
        return lastIndex;
    }

    public void setLastIndex(Long lastIndex) {
        this.lastIndex = lastIndex;
    }

    public String getKey() {
        return keyPressed;
    }

    public void setKey(String key) {
        this.keyPressed = key;
    }

    public Double getTime() {
        return keyPressTime;
    }

    public void setTime(Double time) {
        this.keyPressTime = time;
    }
}
