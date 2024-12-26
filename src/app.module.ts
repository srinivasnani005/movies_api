import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://srinivasnani005:WpoJnkcSs4dyvJOr@cluster0.3w3ds.mongodb.net/'), 

    // .dotenv file is there but i have given directly to understand the code and to run the code

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/uploads',
    }), 
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// srinivasnani005
// WpoJnkcSs4dyvJOr