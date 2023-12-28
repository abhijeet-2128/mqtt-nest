import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('subscriber')
export class SubscriberController {
    @MessagePattern('notification_channel')
    getNotify(@Payload() data) {
      console.log('Received notification:', data);
      return `I Got Message From Client: ${JSON.stringify(data)}`
    }
  
    @MessagePattern('process_channel')
    handleProcess(@Payload() data) {
      console.log('Received process data:', data);
      return `I Got Message From Client: ${JSON.stringify(data)}`
    }
}
