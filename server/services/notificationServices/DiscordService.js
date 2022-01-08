const { Client, Intents, MessageEmbed } = require('discord.js');

class DiscordService {

  constructor() {
    this.init();
  }

  async init() {
    // this.bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

    // this.bot.once('ready', () => {
    //   console.log('Discord Bot Online')
    //   this.online = true;
    // });

    // this.bot.login(process.env.DISCORD_TOKEN)

    this.online = true
  }

  // async sendNotification(title, message, config, color) {

  //   if (!config || !config.channel_id) {
  //     throw new Error('Not a valid config object');
  //   }

  //   if (!this.online) {
  //     throw new Error('Discord Service not ready yet, try again in a minute');
  //   }

  //   const channel = await this.bot.channels.cache.get(config.channel_id);
  //   if (!channel) {
  //     throw new Error('Discord channel does not exist');
  //   }

  //   const embed = new MessageEmbed()
  //     .setTitle(title)
  //     .setColor(`0x${color ?? "ffffff"}`)
  //     .setDescription(message)
  //     .setTimestamp();

  //   await channel.send({ embeds: [embed] })
  // }
}

module.exports = DiscordService;