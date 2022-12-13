package app.minebot.verificationplugin;

import org.bson.Document;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

public class CommandRunner implements CommandExecutor {
	
	
	
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
    	try {
    		MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb+srv://mwalden:NJOXr9p2KvLzcRY5@cluster0.bt5v83e.mongodb.net"));
    		MongoDatabase database = mongoClient.getDatabase("Minebot");
    		MongoCollection<Document> PendingVerifications = database.getCollection("Pending_Verifications");
    		
    		
	        if (sender instanceof Player) {
	            Player player = (Player) sender;
	
	            String verificationCode = args[0];
	            
	            Document foundVerification = PendingVerifications.find(eq("uuid", player.getUniqueId())).first();
	            
	            if (foundVerification == null) {
	            	sender.sendMessage("Could not find your verification!");
	            } else {
	            	if (foundVerification.get("verificationCode").equals(verificationCode)) {
		            	foundVerification.put("verified", true);
		            	PendingVerifications.updateOne(eq("uuid", player.getUniqueId()), foundVerification);
		            	sender.sendMessage("Successfully verified, please check Discord!");
	            	}else {
		            	sender.sendMessage("Failed to verify! Incorrect verification code, please try again.");
	            	}
	            }
	            
	        }
	        
		}catch(Exception e) {
        	sender.sendMessage("Something went wrong");
		}

        // If the player (or console) uses our command correct, we can return true
        return true;

    }
   }