package co.edu.uptc.projectweb.Servlet;


import co.edu.uptc.projectweb.Controller.MongoDBConnect;
import co.edu.uptc.projectweb.DAOS.DAOStudent;
import co.edu.uptc.projectweb.Model.Discipline;
import co.edu.uptc.projectweb.Model.Event;
import co.edu.uptc.projectweb.Model.Student;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.client.MongoClient;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;


@WebServlet(name = "ajaxServlet", value = "/ajaxServlet")
public class Servlet extends HttpServlet {
    private MongoDBConnect dbConnect;

    @Override
    public void init() throws ServletException {
        dbConnect = new MongoDBConnect();
    }
    private DAOStudent daoStudent = new DAOStudent(dbConnect.getMongoClient());
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
        List<Student> afiliados = daoStudent.getStudents();
        String json = gson.toJson(afiliados);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            BufferedReader reader = request.getReader();
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }

            String requestStudent = stringBuilder.toString();

            // Convertir el JSON a un objeto JSONObject
            JSONObject jsonStudent = new JSONObject(requestStudent);

            // Obtener los campos del JSON

            int id = jsonStudent.getInt("id");
            String name = jsonStudent.getString("name");
            String surname = jsonStudent.getString("surname");
            String address = jsonStudent.getString("address");

            // Obtener la disciplina del estudiante
            JSONObject jsonDiscipline = jsonStudent.getJSONObject("discipline");
            String disciplineName = jsonDiscipline.getString("name");
            String disciplineType = jsonDiscipline.getString("type");

            // Crear el objeto Discipline
            Discipline discipline = new Discipline(disciplineName, disciplineType);

            // Obtener los eventos del estudiante
            JSONArray jsonEvents = jsonStudent.getJSONArray("events");
            List<Event> events = new ArrayList<>();

            for (int i = 0; i < jsonEvents.length(); i++) {
                JSONObject jsonEvent = jsonEvents.getJSONObject(i);
                String eventName = jsonEvent.getString("name");
                String eventDate = jsonEvent.getString("date");
                int eventPosition = jsonEvent.getInt("position");
                Event event = new Event(eventName, eventPosition, eventDate);
                events.add(event);
            }

            // Crear el objeto Student
            Student student = new Student(id, name, surname, address, discipline, events);

            System.out.println(student);
            // Actualizar el estudiante en la base de datos
            daoStudent.insertStudent(student);

            // Responder con el objeto Student actualizado
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.getWriter().write(jsonStudent.toString());
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", e.getMessage());
            String errorJson = new Gson().toJson(errorMap);
            response.getWriter().write(errorJson);
        }





    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            BufferedReader reader = request.getReader();
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }

            String requestStudent = stringBuilder.toString();

            // Convertir el JSON a un objeto JSONObject
            JSONObject jsonStudent = new JSONObject(requestStudent);

            // Obtener los campos del JSON
            int id = jsonStudent.getInt("id");
            String name = jsonStudent.getString("name");
            String surname = jsonStudent.getString("surname");
            String address = jsonStudent.getString("address");

            // Obtener la disciplina del estudiante
            JSONObject jsonDiscipline = jsonStudent.getJSONObject("discipline");
            String disciplineName = jsonDiscipline.getString("name");
            String disciplineType = jsonDiscipline.getString("type");

            // Crear el objeto Discipline
            Discipline discipline = new Discipline(disciplineName, disciplineType);

            // Obtener los eventos del estudiante
            JSONArray jsonEvents = jsonStudent.getJSONArray("events");
            List<Event> events = new ArrayList<>();

            for (int i = 0; i < jsonEvents.length(); i++) {
                JSONObject jsonEvent = jsonEvents.getJSONObject(i);
                String eventName = jsonEvent.getString("name");
                String eventDate = jsonEvent.getString("date");
                int eventPosition = jsonEvent.getInt("position");
                Event event = new Event(eventName, eventPosition, eventDate);
                events.add(event);
            }

            // Crear el objeto Student
            Student student = new Student(id, name, surname, address, discipline, events);

            System.out.println(student);
            // Actualizar el estudiante en la base de datos
            daoStudent.updateStudent(student);

            // Responder con el objeto Student actualizado
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.getWriter().write(jsonStudent.toString());
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", e.getMessage());
            String errorJson = new Gson().toJson(errorMap);
            response.getWriter().write(errorJson);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse response) throws IOException {
        try {
            String studentId = req.getParameter("studentId");
            if (studentId != null && !studentId.isEmpty()) {
                daoStudent.deleteStudent(Integer.parseInt(studentId));
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", e.getMessage());
            String errorJson = new Gson().toJson(errorMap);
            response.getWriter().write(errorJson);
        }
    }

}


//        int idStudent = Integer.parseInt(request.getParameter("idStudent"));
//        String name = request.getParameter("name");
//        String surname = request.getParameter("surname");
//        String address = request.getParameter("address");
//
//        int idDiscipline = Integer.parseInt(request.getParameter("idDiscipline"));
//        String nameDicscipline = request.getParameter("nameDicscipline");
//        String type = request.getParameter("type");
//
//        Discipline discipline = new Discipline(idDiscipline, nameDicscipline, type);
//        List<Event> eventos = new ArrayList<>();
////         evento = crearEvento(request, afiliados, afiliado);
////        eventos.add(evento);
//
//        Student student = new Student(idStudent, name, surname, address, discipline, eventos);

    //int idStudent = Integer.parseInt(request.getParameter("idAfiliado")); //CAMBIAR ESTUDIANE
//            // Buscar el afiliado existente
//            List<Student> students = daoStudent.getStudents();
//            Student studentExistent = students.stream()
//                    .filter(a -> a.getId() == idStudent)
//                    .findFirst()
//                    .orElse(null);