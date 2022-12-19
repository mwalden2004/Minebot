package app.minebot.verificationplugin;

import org.bukkit.plugin.java.JavaPlugin;

public class MainPlugin extends JavaPlugin {
	
	@Override
	public void onEnable() {
		System.out.println("Started MineBot");
		this.getCommand("verify").setExecutor(new CommandRunner());
	}
	
	@Override
	public void onDisable() {
		
	}
	
}
