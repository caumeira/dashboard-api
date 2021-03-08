import { UseCase } from '../use-case';

import { Result } from '@/application/logic/Result';
import { VideoFileRepository } from '@/application/repository/video/video-file-repository';
import { VideoFileDTO } from '@/application/dtos/video-files-dto';

type VideoFileParams = Omit<VideoFileDTO, 'id'>;

export class AddVideoFileUseCase
  implements UseCase<VideoFileParams, VideoFileDTO> {
  constructor(public videoFileRepository: VideoFileRepository) {}

  async execute(request: VideoFileParams): Promise<Result<VideoFileDTO>> {
    const res = await this.videoFileRepository.create({ ...request });

    return Result.ok(res);
  }
}
