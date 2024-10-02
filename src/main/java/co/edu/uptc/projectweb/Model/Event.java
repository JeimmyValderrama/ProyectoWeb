package co.edu.uptc.projectweb.Model;

import java.util.Date;

public class Event {
    private String name;
    private int position;
    private String date;

    public Event(String name, int position, String date) {
        this.name = name;
        this.position = position;
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Event{" +
                "name='" + name + '\'' +
                ", position=" + position +
                ", date='" + date + '\'' +
                '}';
    }
}
