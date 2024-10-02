package co.edu.uptc.projectweb.Controller;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;

public class MongoDBConnect {
    private MongoClient mongoClient = null;

    public MongoDBConnect() {
        String uri = "mongodb+srv://valderramajeimmy:yIrClEeyKlg3BlhA@cluster0.dhrbh.mongodb.net/SportClub?retryWrites=true&w=majority&appName=Cluster0"; // Reemplaza con tu connection string
        mongoClient = MongoClients.create(uri);  // Utiliza MongoClients en lugar de MongoClient para Atlas

        MongoDatabase database = mongoClient.getDatabase("SportClub"); // Nombre de tu base de datos
       /* if (!database.listCollectionNames().into(new ArrayList<String>()).contains("Students")) {
            database.createCollection("Students");
        }*/
    }

    public MongoClient getMongoClient() {
        return mongoClient;
    }
}



