package co.edu.uptc.projectweb.Servlet;


import co.edu.uptc.projectweb.Controller.MongoDBConnect;
import co.edu.uptc.projectweb.DAOS.DAOStudent;
import co.edu.uptc.projectweb.Model.Student;
import com.google.gson.Gson;
import com.mongodb.client.MongoClient;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(name = "servletFilter", value = "/servletFilter")
public class ServletFilter extends HttpServlet {

    private MongoDBConnect dbConnect;

    @Override
    public void init() throws ServletException {
        dbConnect = new MongoDBConnect();
    }
    private DAOStudent daoStudent = new DAOStudent(dbConnect.getMongoClient());

    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException {
        try {
            String filter = req.getParameter("filter"); //Cambiar por filter
            System.out.println(filter);
            String param = req.getParameter("param"); // Cambiar por param
            List<Student> students = new ArrayList<>();

            if(param != null && !param.isEmpty()){
                students = filterStudents(filter, param);
            }else {
                students = daoStudent.getStudents();
            }


            String json = gson.toJson(students);
            System.out.println(json);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", e.getMessage());
            String errorJson = new Gson().toJson(errorMap);
            response.getWriter().write(errorJson);
        }
    }

    private List<Student> filterStudents(String filter, String param) {
        daoStudent.updateList();
        switch (filter) {
            case "MostrarTodos":
                return daoStudent.getStudents();
            case "Nombre":
                return daoStudent.filterGetStudentsForName(param);
            case "Apellido":
                return daoStudent.filterGetStudentsForSurname(param);
            case "IdDisciplina":
                return daoStudent.filterGetStudentsForId(Integer.parseInt(param));
            case "Disciplina":
                return daoStudent.filterGetStudentsForDicipline(param);
            case "Evento":
                return daoStudent.filterGetStudentsForEvent(param);
            default:
                throw new IllegalArgumentException("Coloca algún parámetro para Consultar");
        }
    }


}
