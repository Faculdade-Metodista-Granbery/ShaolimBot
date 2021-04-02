const { runSample } = require('../services/dialoflow.service');
const { getAula } = require('../services/firebase.service');

const grettings = ['slc, essa aula tá massa:', 'lancei a braba', 'segura essa meu consagrado'];

exports.run = async (client, message, args) => {
  const receive = args.join(' ');
  const tema = await runSample({ message: receive });
  if (!tema) return false;
  const response = await getAula({ tema })
  const rand = Math.floor(Math.random() * (grettings.length));
  message.channel.send(`${grettings[rand]} ${response.val()}`);
};
