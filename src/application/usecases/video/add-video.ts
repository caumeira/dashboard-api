import { UseCase } from '../use-case';

import { Result } from '@/application/logic/Result';
import { VideoDTO } from '@/application/dtos/video-dto';
import {
  VideoRepository,
  VideosParams,
} from '@/application/repository/video/video-repository';
import { VideoFileDTO } from '@/application/dtos/video-files-dto';

export class AddVideoUseCase
  implements UseCase<VideosParams, VideoDTO | Error> {
  constructor(public videoRepository: VideoRepository) {}

  async execute(request: VideosParams): Promise<Result<VideoDTO | Error>> {
    const res = await this.videoRepository.create({
      ...request,
    });

    if (res.isFailure) {
      return Result.fail(new Error());
    }

    return Result.ok(res.getValue());
  }
}
