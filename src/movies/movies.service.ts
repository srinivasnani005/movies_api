import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AddReviewDto } from './dto/add-review.dto';
import { Movie, MovieDocument } from './schema/movies.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async create(createMovieDto: CreateMovieDto): Promise<{ message: string }> {
    const newMovie = new this.movieModel(createMovieDto);
    newMovie.save();
    return { message: `Movie ${createMovieDto.title} created successfully` };
  }

  async findAll(page: number, limit: number): Promise<{ movies: Movie[]; pagination: { currentPage: number; totalPages: number; totalMovies: number; moviesPerPage: number } }> {
    const totalMovies = await this.movieModel.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await this.movieModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      movies,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalMovies: totalMovies,
        moviesPerPage: limit,
      },
    };
  }

  async search(query: string, page: number, limit: number): Promise<{ movies: Movie[]; pagination: { currentPage: number; totalPages: number; totalMovies: number; moviesPerPage: number } }> {
    const regex = new RegExp(query, 'i'); // Case-insensitive search
    const totalMovies = await this.movieModel.countDocuments({
      $or: [{ title: { $regex: regex } }, { genre: { $regex: regex } }],
    });
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await this.movieModel
      .find({ $or: [{ title: { $regex: regex } }, { genre: { $regex: regex } }] })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      movies,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalMovies: totalMovies,
        moviesPerPage: limit,
      },
    };
  }

  async findOne(id: string): Promise<MovieDocument> {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException(`Movie with ID "${id}" not found`);
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updatedMovie = await this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true });
    if (!updatedMovie) throw new NotFoundException(`Movie with ID "${id}" not found`);
    return updatedMovie;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.movieModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Movie with ID "${id}" not found`);

    return { message: `Movie with ID ${id} has been deleted` };
  }

  async addReview(id: string, addReviewDto: AddReviewDto): Promise<{ message: string }> {
    const movie = await this.findOne(id);
    movie.userReviews.push({ ...addReviewDto, date: new Date().toISOString() });
    await movie.save();
    return { message: `Review added to movie ${movie.title} successfully` };
  } 
}
