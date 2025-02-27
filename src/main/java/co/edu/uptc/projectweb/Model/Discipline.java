package co.edu.uptc.projectweb.Model;

public class Discipline {
    private String name;
    private String type;

    public Discipline(String name, String type) {
        this.name = name;
        this.type = type;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    @Override
    public String toString() {
        return "Discipline{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
