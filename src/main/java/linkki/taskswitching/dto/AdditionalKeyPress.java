package linkki.taskswitching.dto;

import java.util.Date;

public class AdditionalKeyPress {

    private Long lastIndex;
    private String key;
    private Double time;

    public AdditionalKeyPress() {
    }

    public Long getLastIndex() {
        return lastIndex;
    }

    public void setLastIndex(Long lastIndex) {
        this.lastIndex = lastIndex;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Double getTime() {
        return time;
    }

    public void setTime(Double time) {
        this.time = time;
    }
}
