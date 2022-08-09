import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Post {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  isPublished: boolean;
}
