import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
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

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);
    if (!post) throw new NotFoundException('포스트를 찾을 수 없습니다.');
    return post;
  }

  createPost(author: string, title: string, content: string) {
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

  updatePost(id: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === id);
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

    return (posts = posts.map((prevPost) =>
      prevPost.id === id ? post : prevPost,
    ));
  }

  deletePost(id: number) {
    const post = posts.find((post) => post.id === +id);
    if (!post) throw new NotFoundException('포스트를 찾을 수 없습니다.');

    posts = posts.filter((post) => post.id !== +id);

    return id;
  }
}
