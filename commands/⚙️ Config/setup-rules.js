const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
  name: 'setuprules',
  aliases: ["rules", 'setup-rules'],
  category: '⚙️ Config',
  memberpermissions: ['ADMINISTRATOR'],
  cooldown: 5,
  description: "Setup The Rules in Guild",
  usage: "jointocreate",
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, prefix) => {

    // rules 1
    let rules1 = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`\`\`🔰 General Rules 🔰\`\``)
      .setFooter(ee.footertext)
      .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
      .setDescription(`
            > 1️  :- Tratar a todos los miembros con respeto.\n
            > 2️  :- No se tolerará el acoso, el abuso, el discurso de odio o cualquier tipo de discurso discriminatorio..\n
            > 3️  :- De ninguna manera ofendas intencionalmente a ningún miembro del servidor de Discord..\n
            > 4️  :- No se tolerarán insultos raciales u ofensivos.\n
            > 5️  :- Etiquetar a un miembro/miembro del personal sin motivo resultará en una advertencia.\n
            > 6️  :- Revelar información privada sobre cualquier individuo; es una regla de tolerancia cero.\n
            > 7️  :- No acuses públicamente a otros usuarios/jugadores de mala conducta.\n
            > 8️  :- Sin modificaciones en el asiento trasero.\n
            > 9️  :- No hablar de temas relacionados con la religión o la política..\n
            > 1️0 :- Se permiten palabras o oraciones cortas en otros idiomas que no sean inglés solo con el fin de enseñar a alguien o para aclarar.\n
            > 11 :- Damos la bienvenida a las críticas constructivas, pero tenemos tolerancia cero con las demandas agresivas o legítimas..\n
            > 12 :- Se supone que las mujeres miembros del servidor deben verificarse a sí mismas a través de los canales de voz de las moderadoras lo antes posible al unirse al servidor. Además, si ya están en el servidor, para evitar ciertos escenarios, suplantar el uso de cuentas femeninas falsas obtendrá la prohibición permanente del servidor una vez que se pruebe.
            `)


    // rules 2

    let rules2 = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
      .setTitle(`\`\`🔰 Chat Rules 🔰\`\``)
      .setFooter(ee.footertext)
      .setDescription(`
       > 1️3  :- No enviar spam (Emoji, el mismo mensaje una y otra vez o No enviar spam para aumentar el nivel.\n
       > 14  :- Si algún miembro del personal solicita cambiar el tema de conversación, entonces debe cambiarse, si se vuelve demasiado ofensivo para otros miembros. Si no se sigue, hay kick/ban.\n
       > 15  :- Solicitamos encarecidamente a nuestros antiguos miembros que den la bienvenida a los nuevos miembros e intenten incluirlos en su conversación. No actúes de manera espeluznante o grosera con los nuevos miembros porque no saben cómo comportarse en el servidor..\n
       > 16  :- Respete a todo el personal y siga sus instrucciones. No use nombres abusivos/extraños/imágenes de perfil. Si algún mod lo encontró culpable, puede cambiar su nombre en cualquier momento.\n
       > 17  :- No expongas a nadie. No envíe ninguna información privada de nadie sin permiso. Eso incluye fotos.\n
       > 18  :- No etiquete al personal al azar si no es necesario.\n
       > 19  :- Si alguien te molesta: simplemente bloquea a la persona y sigue adelante..\n
       > 20  :- Tener sentido común para entender los juegos de palabras/sarcasmos.\n
       > 21  :- No te portes mal con las chicas y respeta a todos y cada uno de los miembros del servidor..\n
       > 22  :- El uso excesivo de malas palabras conducirá a la prohibición/expulsión permanente.\n
       `)


    // rules 3

    let rules3 = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
      .setTitle(`\`\`🔰 Voice Rules 🔰\`\``)
      .setFooter(ee.footertext)
      .setDescription(`
       > 23  :- Está prohibido publicar cualquier contenido relacionado con piratería, trampas, cracks, exploits o cualquier tipo de material que infrinja los derechos de autor..\n
       > 24  :- Se prohíbe cualquier actividad maliciosa hacia el servidor o cualquier miembro.\n
       > 25  :- Este servidor sigue todas las Pautas de Discord y los Términos de servicio. Por favor, lea y siga todos los enumerados.\n
       > 26  :- Las amenazas como DDoS, DoX o amenazas generalizadas están estrictamente prohibidas y resultarán en una eliminación/prohibición inmediata de la comunidad.\n
       > 27  :- Cualquier intento de "violar" a otros miembros de la comunidad está estrictamente prohibido y resultará en una eliminación/prohibición inmediata del servidor.\n
       > 28  :- No discuta con ningún Mod/Staff. Su decisión será la última decisión.\n
       > 29  :-  No use el cambiador de voz en vc, esto conducirá a la prohibición permanente del servidor.\n
       > 30  :- No sople aire en el micrófono o de lo contrario se le prohibirá vc.\n
       `)

    let follow = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`🔰 ** Lea todas las reglas con cuidado ** 🔰`)
      .setDescription(`\`\`Lea atentamente las reglas anteriores y sígalas..\n⭕ Note: Las reglas se cambiarán según los requisitos en el futuro..  \`\``)
      .setImage("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
      .setFooter(ee.footertext)

    message.channel.send(`@everyone`)
    message.channel.send(rules1);
    message.channel.send(rules2);
    message.channel.send(rules3);
    message.channel.send(follow).then(msg => msg.react("✅"))
  }
}

