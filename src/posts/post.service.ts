import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly userRepository: MongoRepository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    // const coffee = await this.userRepository.findOne(1);
    // if (!coffee) {
    //   throw new NotFoundException(`User #${id} not found`);
    // }
    return null;
  }
}
