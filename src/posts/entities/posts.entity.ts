// entity === model
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 자동으로 테이블을 생성한다.
@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
