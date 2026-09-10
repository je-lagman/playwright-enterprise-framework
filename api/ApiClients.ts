import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';

export class ApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(
    request: APIRequestContext,
    baseUrl: string
  ) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string): Promise<APIResponse> {
    return await this.request.get(
      `${this.baseUrl}${endpoint}`
    );
  }

  async post(
    endpoint: string,
    data: unknown
  ): Promise<APIResponse> {
    return await this.request.post(
      `${this.baseUrl}${endpoint}`,
      { data }
    );
  }

  async put(
    endpoint: string,
    data: unknown
  ): Promise<APIResponse> {
    return await this.request.put(
      `${this.baseUrl}${endpoint}`,
      { data }
    );
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return await this.request.delete(
      `${this.baseUrl}${endpoint}`
    );
  }
}