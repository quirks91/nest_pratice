import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

// IOC Container 가 클래스를 실행할 수 있도록 등록해줌.
@Module({
  imports: [
    // repository 는 모델을 다룰 때 사용하는 클래스
    TypeOrmModule.forFeature([PostsModel]),
  ],
  controllers: [PostsController],
  providers: [PostsService], // Injectable 서비스에서 어노테이션을 등록해야 함.
})
export class PostsModule {}
