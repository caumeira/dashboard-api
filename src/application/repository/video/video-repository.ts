import { Repository } from '../repository';

import { VideoDTO } from '@/application/dtos/video-dto';
import { Result } from '@/application/logic/Result';
import { VideoFileDTO } from '@/application/dtos/video-files-dto';

export type VideoFileParam = Omit<VideoFileDTO, 'id' | 'videoId'>;
export type VideosParams = Omit<VideoDTO, 'id' | 'files'> & {
  files?: VideoFileParam[];
};

export interface VideoRepository extends Repository {
  findById(id: number): Promise<Result<VideoDTO | Error>>;
  create(video: Omit<VideosParams, 'id'>): Promise<Result<VideoDTO | Error>>;
}
