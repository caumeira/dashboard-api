import * as yup from 'yup';

import { AddVideoUseCase } from '@/application/usecases/video/add-video';
import { badRequest, ok } from '@/presentation/helpers/http/http-helper';
import { Controller } from '@/presentation/protocols/controller';
import { Request } from '@/presentation/protocols/request';
import { Response } from '@/presentation/protocols/response';

type AddVideoParams = {
  title: string;
  description: string;
  files?: { name: string }[];
};

const addVideoParamsScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  files: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
      })
    )
    .notRequired(),
});

export class AddVideoController
  implements Controller<AddVideoParams, { userId: number }> {
  constructor(public addVideoUseCase: AddVideoUseCase) {}

  paramSchema(): yup.SchemaOf<AddVideoParams> {
    return addVideoParamsScheme;
  }

  async handle(
    request: Request<AddVideoParams, { userId: number }>
  ): Promise<Response> {
    const { title, description, files } = request.body;

    const video = await this.addVideoUseCase.execute({
      title,
      description,
      userId: request.userId,
      files: files?.map((item) => ({
        name: item.name,
      })),
    });

    if (video.isFailure) {
      return badRequest(video.error);
    }

    return ok({ message: 'success' });
  }
}
