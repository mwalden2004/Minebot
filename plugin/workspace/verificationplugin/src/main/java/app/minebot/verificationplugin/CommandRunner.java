package app.minebot.verificationplugin;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;


public class CommandRunner implements CommandExecutor {

	
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
    		
    		
	        if (sender instanceof Player) {
				Player player = (Player) sender;

				if (args.length == 0){
					player.sendMessage("You must enter a valid verification code");
				}else {
					String verificationCode = args[0];
					String playerUUID = player.getUniqueId().toString();

					if (verificationCode.length() <= 5) {
						player.sendMessage("You must enter a valid verification code");
					} else {

						URL url = null;
						String requestUrl = "https://api.minebot.app/discord/api/bs16EZjG84OMLfa1Dx2JFkZ3MkKcyGNd8gOLiMwF3WVpGIE9gFfezGPYAL8/verify/" + playerUUID + "/" + verificationCode;
						System.out.print(requestUrl);
						try {
							url = new URL(requestUrl);
						} catch (MalformedURLException e) {
							throw new RuntimeException(e);
						}
						BufferedReader reader = null;
						try {
							reader = new BufferedReader(new InputStreamReader(url.openStream()));
						} catch (IOException e) {
							throw new RuntimeException(e);
						}
						String response = "";
						String line;
						while (true) {
							try {
								if (!((line = reader.readLine()) != null)) break;
							} catch (IOException e) {
								throw new RuntimeException(e);
							}
							response += line;
						}
						try {
							reader.close();
						} catch (IOException e) {
							throw new RuntimeException(e);
						}

						player.sendMessage(response);
					}
				}
				;
			}

        // If the player (or console) uses our command correct, we can return true
        return true;

    }
   }