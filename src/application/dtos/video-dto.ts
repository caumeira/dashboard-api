import { UserDTO } from './user-dto';
import { VideoFileDTO } from './video-files-dto';

export type VideoDTO = {
  id: number;
  title: string;
  description: string;
  userId: number;
  files?: VideoFileDTO[];
};
