require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

const Etype = Object.freeze({
  PLAYING: 'PLAYING',
});

client.on('ready', () => {
  const activities = [
    'nenhum porco será perdoado!',
    `em ${client.guilds.cache.size} servidores!`,
    `${process.env.PREFIX}help para ver comandos`,
    'bacon hmm',
  ];
  let i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: Etype.PLAYING }), 5000);
  client.user.setStatus('available');
  console.log(`Bot Online em ${client.guilds.cache.size} servidores`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  if (message.content.startsWith(`@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}`)) return;

  const args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0];
  command = command.slice(process.env.PREFIX.length);
  try {
    const commandFile = require(`./commands/${command}.js`);
    delete require.cache[require.resolve(`./commands/${command}.js`)];
    return commandFile.run(client, message, args);
  } catch (err) {
    console.error(`Erro: ${err}`);
  }
});
