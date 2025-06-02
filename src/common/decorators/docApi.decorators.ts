import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

const schemaExample = {
  user: {
    name: 'Vasia',
    version: 1,
    createdAt: 1672531199000,
    updatedAt: 1672531299000,
  },
  artist: {
    name: 'Vasia',
    grammy: true,
  },
  album: {
    name: 'Album name',
    year: 2023,
    artistId: '123e4567-e89b-12d3-a456-426614174000',
  },
  track: {
    name: 'Track name',
    artistId: '123e4567-e89b-12d3-a456-426614174000',
    albumId: '123e4567-e89b-12d3-a456-426614174000',
    duration: 240,
  },
};

export function ApiUUIDParam(name: string) {
  return applyDecorators(
    ApiParam({
      name: 'id',
      description: `UUID ${name} id`,
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  );
}

export function ApiCreate(summary: string, requestDto: any, responseDto: any) {
  return applyDecorators(
    ApiOperation({ summary: `Create ${summary}` }),
    ApiBody({
      description: `Data for creating a new ${summary.toLowerCase()}`,
      type: requestDto,
      schema: {
        example: schemaExample[summary.toLowerCase()],
      },
    }),
    ApiResponse({
      status: 201,
      description: `${summary} successfully created`,
      type: responseDto,
      schema: {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          ...schemaExample[summary.toLowerCase()],
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
  );
}

export function ApiGet(summary: string, responseDto: any) {
  return applyDecorators(
    ApiOperation({ summary: `Get all ${summary}` }),
    ApiResponse({
      status: 200,
      description: `${summary} found`,
      type: [responseDto],
      schema: {
        example: schemaExample[summary.toLowerCase()],
      },
    }),
  );
}

export function ApiUpdate(summary: string, requestDto: any, responseDto: any) {
  return applyDecorators(
    ApiOperation({ summary: `Update ${summary}` }),
    ApiUUIDParam(summary),
    ApiBody({
      description: `Data for updating an existing ${summary.toLowerCase()}`,
      schema: {
        example: schemaExample[summary.toLowerCase()],
      },
    }),
    ApiResponse({
      status: 200,
      description: `${summary} successfully updated`,
      type: responseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. artistId is invalid (not uuid)',
    }),

    ApiResponse({
      status: 404,
      description: `${summary} not found`,
    }),
  );
}

export function ApiGetById(summary: string) {
  return applyDecorators(
    ApiOperation({ summary: `Get ${summary} by id` }),
    ApiUUIDParam(summary),

    ApiResponse({
      status: 200,
      description: `${summary} found`,
      schema: {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          ...schemaExample[summary.toLowerCase()],
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
    ApiResponse({
      status: 404,
      description: `${summary} not found`,
    }),
  );
}

export function ApiDelete(summary: string) {
  return applyDecorators(
    ApiOperation({ summary: `Delete ${summary} by id` }),
    ApiUUIDParam(summary),
    ApiResponse({
      status: 204,
      description: `${summary} successfully deleted`,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. artistId is invalid (not uuid)',
    }),
    ApiResponse({
      status: 404,
      description: `${summary} not found`,
    }),
  );
}

export function ApiAddToFavorites(summary: string, responseType: any) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 201,
      description: `${summary}`,
      type: responseType,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiResponse({
      status: 422,
      description: `${summary.split(' ')[1]} not found`,
    }),
  );
}

export function ApiRemoveFromFavorites(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 204,
      description: `${summary}`,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiResponse({
      status: 422,
      description: `${summary.split(' ')[1]} not found`,
    }),
  );
}
