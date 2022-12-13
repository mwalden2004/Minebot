import { ColorResolvable, EmbedBuilder } from 'discord.js';

export default function EmbedCreator({title, description, color}: {title: string; description?: string; color?: ColorResolvable;}): EmbedBuilder {
    const newEmbed = new EmbedBuilder();
    newEmbed.setColor(color||0x0099FF);
    newEmbed.setTitle(title);
    newEmbed.setTimestamp();
    if (description){
        newEmbed.setDescription(description);
    }



    return newEmbed;

}