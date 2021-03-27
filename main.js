const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    let activities = [
        `nenhum porco será perdoado!`,
        `em ${client.guilds.cache.size} servidores!`,
        `${config.prefix}help para ver comandos`,
        `bacon hmm`
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING" }), 5000);
    client.user.setStatus("available");
    console.log(`Bot Online em ${client.guilds.cache.size} servidores`);

});

client.login(config.token);

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.startsWith(config.prefix)) return;
    if (message.content.startsWith(`@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}`)) return;

    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    try {
        let commandFile = require(`./commands/${command}.js`);
        delete require.cache[require.resolve(`./commands/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (err) {
        console.error("Erro: " + err);
    }
});
