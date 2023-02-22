import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema() // add this
export class Application {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  event: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  start: string;

  @Prop({ required: true })
  end: string;

  @Prop({ required: true })
  positionsRequested: string[];

  @Prop({ required: true })
  facilitiesRequested: string[];

  @Prop({ required: true })
  notes: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
