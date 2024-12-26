import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddReviewDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
