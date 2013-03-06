package linkki.taskswitching.dto;

import java.util.Date;

public class AdditionalKeyPress {

    private Long lastIndex;
    private String key;
    private Date time;

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

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
