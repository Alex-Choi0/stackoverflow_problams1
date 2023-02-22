import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dto/createApplication.dto';
import { Application, ApplicationDocument } from './schemas/application.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('applications')
    private applicationsModel: Model<ApplicationDocument>,
  ) {}

  // ... irrelevant code ...

  async postApplications(dto: CreateApplicationDto): Promise<Application> {
    try {
      // Check for duplicate
      let dup: Array<object> = await this.applicationsModel.find({
        dto,
      });
      // If duplicate found, not allowed
      if (dup.length > 0)
        throw new ForbiddenException('Application Already Submitted');

      // Get event
      //let event = await this.eventsModel.findOne({ sku: dto.event })

      // If no event, return 404
      // if (!event) throw new NotFoundException()

      // let eventStart = event.start
      // let eventEnd = event.end

      // add temp eventStart, eventEnd
      const currentDate = new Date();
      let eventStart = new Date(
        currentDate.getTime() + 1 * 60 * 60 * 1000,
      ).toISOString();
      let eventEnd = new Date(
        currentDate.getTime() + 2 * 60 * 60 * 1000,
      ).toISOString();

      if (
        // Start before end
        !(new Date(dto.start).getTime() < new Date(dto.end).getTime()) ||
        // Start and end during event
        !(
          (new Date(dto.start).getTime() >= new Date(eventStart).getTime())
          // doesn't need to check time
          // && new Date(dto.end).getTime() <= new Date(eventEnd).getTime()
        )
      )
        throw new ForbiddenException('Incorrect start or end');

      const app = new this.applicationsModel(dto);

      // there was an error. need to add id.
      app.id = app._id;

      return app.save();
    } catch (err) {
      throw err;
    }
  }
}
