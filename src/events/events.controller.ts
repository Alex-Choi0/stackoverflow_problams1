import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { EventsService } from './events.service';

@ApiTags('MongoDB API : Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('applications')
  postApplications(@Body() dto: CreateApplicationDto) {
    return this.eventsService.postApplications(dto);
  }
}
