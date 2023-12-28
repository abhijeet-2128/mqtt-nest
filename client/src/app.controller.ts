import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('MQTT_SERVICE') private client: ClientProxy,
    private readonly appService: AppService) {}

    @Post('notifications')
    postNotifications(@Req() req) {
      const notificationMessage = req.body;
       return this.client.send('notification_channel', notificationMessage);
    }

    @Post('process')
    processMessage(@Body() requestBody:object) {
      const processData = requestBody;
      return this.client.send('process_channel', processData);
    }


    
  
}
