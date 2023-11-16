import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

// eslint-disable-next-line prefer-const
let posts: PostModel[] = [
  {
    id: 1,
    author: 'new',
    title: '김',
    content: '김가루',
    likeCount: 100,
    commentCount: 200,
  },
  {
    id: 2,
    author: 'old',
    title: '최',
    content: '최고',
    likeCount: 100,
    commentCount: 200,
  },
  {
    id: 3,
    author: 'mid',
    title: '신',
    content: '신라면',
    likeCount: 100,
    commentCount: 200,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  // 모든 post 를 가져온다.
  @Get()
  getPosts() {
    return posts;
  }

  // 2) GET /posts/:id
  // id에 해당하는 post 를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) throw new NotFoundException('포스트를 찾을 수 없습니다.');
    return post;
  }

  // 3) POST /posts
  // post 를 생성한다.
  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  // 4) PUT /posts/:id
  // id에 해당되는 post 를 변경한다.

  // 5) DELETE /posts/:id
  // id에 해당되는 post 를 삭제한다.
}
