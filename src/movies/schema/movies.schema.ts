import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  streamingLink: string;

  @Prop()
  releaseYear?: number;

  @Prop()
  duration?: string;

  @Prop()
  language?: string;

  @Prop([String])
  subtitles?: string[];

  @Prop([{ name: String, role: String, profilePicture: String }])
  cast?: { name: string; role: string; profilePicture?: string }[];

  @Prop()
  director?: string;

  @Prop([String])
  writers?: string[];

  @Prop()
  productionCompany?: string;

  @Prop()
  ageRating?: string;

  @Prop([String])
  categories?: string[];

  @Prop([String])
  relatedMovies?: string[];

  @Prop([String])
  audioLanguages?: string[];

  @Prop()
  views?: number;

  @Prop([{ username: String, review: String, rating: Number, date: String }])
  userReviews?: { username: string; review: string; rating: number; date: string }[];

  @Prop({
    type: Object, // Specify type as Object
    default: {}
  })
  media?: {
    trailer?: string;
    poster?: string;
    backdrop?: string;
  };

  @Prop({
    type: Object, // Specify type as Object
    default: {}
  })
  availability?: {
    regions?: string[];
    expiresOn?: string;
  };

  @Prop({ type: Object, default: {} })
  technicalDetails?: {
    resolution?: string;
    aspectRatio?: string;
    audioFormats?: string[];
  };

  @Prop([{ name: String, year: Number }])
  awards?: { name: string; year: number }[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
