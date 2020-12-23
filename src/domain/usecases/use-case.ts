import { Result } from '@/data/logic/Result';

export interface UseCase<Request, Response> {
  execute(request?: Request): Promise<Result<Response>> | Result<Response>;
}
