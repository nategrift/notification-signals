const Service = require('../models/service');
const Notification = require('../models/notification');
const DiscordService = require('./notificationServices/DiscordService');

class NotificationServices {
  services = {
    "discord": new DiscordService()
  };

  async sendNotifications(apiKey, title, message, color) {

    const notificationServices = await Service.findAllForProjectId(apiKey.project_id);

    for (let i in notificationServices) {
      let service = notificationServices[i];

      // sent message to service
      const notificationService = this.services[service.service_type];
      await notificationService.sendNotification(title, message, service.config, color)
    }

    await Notification.createAndSave(apiKey.id, apiKey.project_id, title, message);
  }
}


module.exports = new NotificationServices();