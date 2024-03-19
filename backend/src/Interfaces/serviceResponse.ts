export type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND' | 'CONFLICT' | 'UNAUTHORIZED';

export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage,
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T,
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
