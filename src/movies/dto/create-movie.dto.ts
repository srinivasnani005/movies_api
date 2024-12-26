import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsUrl()
  streamingLink: string;

  @IsOptional()
  @IsNumber()
  releaseYear?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsArray()
  subtitles?: string[];

  @IsOptional()
  @IsArray()
  cast?: { name: string; role: string; profilePicture?: string }[];

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsArray()
  writers?: string[];

  @IsOptional()
  @IsString()
  productionCompany?: string;

  @IsOptional()
  @IsString()
  ageRating?: string;

  @IsOptional()
  @IsArray()
  categories?: string[];

  @IsOptional()
  @IsArray()
  relatedMovies?: string[];

  @IsOptional()
  @IsArray()
  audioLanguages?: string[];

  @IsOptional()
  @IsNumber()
  views?: number;

  @IsOptional()
  @IsArray()
  userReviews?: { username: string; review: string; rating: number; date: string }[];

  @IsOptional()
  media?: {
    trailer?: string;
    poster?: string;
    backdrop?: string;
  };

  @IsOptional()
  availability?: {
    regions?: string[];
    expiresOn?: string;
  };

  @IsOptional()
  technicalDetails?: {
    resolution?: string;
    aspectRatio?: string;
    audioFormats?: string[];
  };

  @IsOptional()
  @IsArray()
  awards?: { name: string; year: number }[];
}
