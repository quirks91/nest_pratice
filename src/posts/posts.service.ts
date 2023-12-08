import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

// eslint-disable-next-line prefer-const

@Injectable()
export class PostsService {
  // Repository 타입을 지정해줘야함 <Model>
  // InjectRepository 도 필요함.
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  // repository 의 모든 함수는 비동기 함수
  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!post) throw new NotFoundException('포스트를 찾을 수 없습니다.');
    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // create → 저장할 객체를 생성
    // save → create 메서드에서 생성된 객체로 저장
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save
    // 1) -> 데이터가 존재하지 않는다면 (id 기준) 새로 생성
    // 2) -> 데이터가 존재한다면 (같은 id) 존재하던 값을 업데이트한다.
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException('포스트가 없습니다.');

    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException('포스트를 찾을 수 없습니다.');

    await this.postsRepository.delete(postId);
  }
}
