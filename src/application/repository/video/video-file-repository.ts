import { Repository } from '../repository';

import { VideoFileDTO } from '@/application/dtos/video-files-dto';

export interface VideoFileRepository extends Repository {
  findById(id: number): Promise<VideoFileDTO>;
  create(video: Omit<VideoFileDTO, 'id'>): Promise<VideoFileDTO>;
}
