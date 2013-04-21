package linkki.taskswitching.dto;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AdditionalKeyPress implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private Long lastIndex;
    private String keyPressed;
    private Double keyPressTime;

    public AdditionalKeyPress() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
