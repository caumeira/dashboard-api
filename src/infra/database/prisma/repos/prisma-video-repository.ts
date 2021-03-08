import { PrismaClient } from '@prisma/client';

import { VideoDTO } from '@/application/dtos/video-dto';
import { VideoRepository } from '@/application/repository/video/video-repository';
import { Result } from '@/application/logic/Result';

export class PrismaVideoRepository implements VideoRepository {
  constructor(public prisma: PrismaClient) {}

  async findById(id: number): Promise<Result<VideoDTO | Error>> {
    const result = await this.prisma.video.findFirst({ where: { id } });

    if (!result) {
      return Result.fail(new Error(''));
    }

    return Result.ok({
      id: result.id,
      title: result.title || '',
      description: result.description || '',
      userId: result.userId,
    });
  }

  async create(video: VideoDTO): Promise<Result<VideoDTO | Error>> {
    const result = await this.prisma.video.create({
      data: {
        title: video.title,
        description: video.description,
        userId: 2,
        VideoFiles: {
          create: video.files?.map((item) => ({ name: item.name })),
        },
      },
    });

    if (!result) {
      return Result.fail(new Error(''));
    }

    return Result.ok({
      id: result.id,
      title: result.title || '',
      description: result.description || '',
      userId: result.userId,
    });
  }
}
