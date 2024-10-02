    package co.edu.uptc.projectweb.DAOS;

    import co.edu.uptc.projectweb.Model.Discipline;
    import co.edu.uptc.projectweb.Model.Event;
    import co.edu.uptc.projectweb.Model.Student;
    import com.mongodb.client.MongoClient;
    import com.mongodb.client.MongoDatabase;
    import org.bson.Document;
    import java.util.ArrayList;
    import com.mongodb.client.FindIterable;
    import com.mongodb.client.MongoCollection;
    import com.mongodb.client.MongoDatabase;
    import org.bson.Document;

    import java.text.SimpleDateFormat;
    import java.util.ArrayList;
    import java.util.List;

    import static com.mongodb.client.model.Filters.eq;

    public class DAOStudent {
        private MongoDatabase database;
        private MongoClient mongoClient;
        private List<Student> students;

        public DAOStudent(MongoClient mongoClient) {
            this.mongoClient = mongoClient;
            database = mongoClient.getDatabase("SportClub");
            students = getStudents();
        }

        public void insertStudent(Student student) {
            try {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                MongoCollection<Document> collection = database.getCollection("Students");

                List<Document> eventsList = new ArrayList<>();

                for (Event event: student.getEvents()) {
                    Document eventDoc = new  Document()
                            .append("name", event.getName())
                            .append("position", event.getPosition())
                            .append("date", event.getDate());
                    eventsList.add(eventDoc);
                }

                Document disciplineDoc = new Document()
                        .append("name", student.getDiscipline().getName())
                        .append("type", student.getDiscipline().getType());

                Document document = new Document()
                        .append("id", student.getId())
                        .append("name", student.getName())
                        .append("surname", student.getSurname())
                        .append("address", student.getAddress())
                        .append("discipline", disciplineDoc)
                        .append("events", eventsList);

                collection.insertOne(document);
                students.add(student);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public void updateStudent(Student student) {
            try {
                MongoCollection<Document> collection = database.getCollection("Students");
                List<Document> eventosList = new ArrayList<>();

                for (Event event : student.getEvents()) {
                    Document eventDoc = new Document()
                            .append("name", event.getName())
                            .append("position", event.getPosition())
                            .append("date", event.getDate());
                    eventosList.add(eventDoc);
                }

                Document disciplineDoc = new Document()
                        .append("name", student.getDiscipline().getName())
                        .append("type", student.getDiscipline().getType());

                Document newDocument = new Document()
                        .append("id", student.getId())
                        .append("name", student.getName())
                        .append("surname", student.getSurname())
                        .append("address", student.getAddress())
                        .append("discipline", disciplineDoc)
                        .append("events", eventosList);

                collection.replaceOne(new Document("id", student.getId()), newDocument);
                students = getStudents();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public List<Student> getStudents() {
            List<Student> students = new ArrayList<>();

            try {
                MongoDatabase database = mongoClient.getDatabase("SportClub");
                MongoCollection<Document> collection = database.getCollection("Students");
                FindIterable<Document> documents = collection.find();

                for (Document doc : documents) {
                    List<Event> events = new ArrayList<>();
                    List<Document> eventsDocs = (List<Document>) doc.get("events");
                    if (eventsDocs != null) {
                        for (Document eventDoc : eventsDocs) {
                            Event event = new Event(
                                    eventDoc.getString("name"),
                                    eventDoc.getInteger("position"),
                                    eventDoc.getString("date")
                            );
                            events.add(event);
                        }
                    }

                    Discipline discipline = new Discipline(
                            doc.get("discipline", Document.class).getString("name"),
                            doc.get("discipline", Document.class).getString("type")
                    );

                    Student student = new Student(
                            doc.getInteger("id"),
                            doc.getString("name"),
                            doc.getString("surname"),
                            doc.getString("address"),
                            discipline,
                            events
                    );

                    students.add(student);
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("ERROR");
            }
            return students;
        }




        public List<Student> filterGetStudentsForName(String name) {
            List<Student> aux = new ArrayList<>();

            for (Student student : students) {
                if(student.getName().equals(name)){
                    aux.add(student);
                }
            }
            return aux;
        }

        public List<Student> filterGetStudentsForSurname(String surname) {
            List<Student> aux = new ArrayList<>();

            for (Student student : students) {
                if(student.getSurname().equals(surname)){
                    aux.add(student);
                }
            }
            return aux;
        }

        public List<Student> filterGetStudentsForId(int id) {
            List<Student> aux = new ArrayList<>();

            for (Student student : students) {
                if(student.getId() == id){
                    aux.add(student);
                }
            }
            return aux;
        }

        public List<Student> filterGetStudentsForDicipline(String dicipline) {
            List<Student> aux = new ArrayList<>();

            for (Student student : students) {
                if(student.getDiscipline().getName().equals(dicipline)){
                    aux.add(student);
                }
            }

            return aux;
        }



        public List<Student> filterGetStudentsForEvent(String nameEvent) {
            List<Student> aux = new ArrayList<>();

            for (Student student : students) {
                for (Event event : student.getEvents()) {
                    if(event.getName().equals(nameEvent)){
                        aux.add(student);
                    }
                }
            }

            return aux;
        }

        public void deleteStudent(int studentId) {
            try {
                MongoCollection<Document> collection = database.getCollection("Students");

                // Buscar el estudiante por su ID y eliminarlo de la colección
                collection.deleteOne(eq("id", studentId));

                // Actualizar la lista de estudiantes después de la eliminación
                students = getStudents();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public void updateList() {
            students = getStudents();
        }

    }
