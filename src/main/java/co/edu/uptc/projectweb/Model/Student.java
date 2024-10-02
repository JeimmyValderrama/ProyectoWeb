package co.edu.uptc.projectweb.Model;

import java.util.Date;
import java.util.List;

public class Student {
    private int id;
    private String name;
    private String surname;
    private String address;
    private Discipline discipline;
    private List<Event> events;

    public Student(int id, String name, String surname, String address, Discipline discipline, List<Event> events) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.discipline = discipline;
        this.events = events;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Discipline getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", address='" + address + '\'' +
                ", discipline=" + discipline +
                ", events=" + events +
                '}';
    }
}
