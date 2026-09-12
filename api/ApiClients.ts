import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;
  readonly defaultHeaders: Record<string, string>;

  constructor(
    request: APIRequestContext,
    baseUrl: string,
    defaultHeaders: Record<string, string> = {}
  ) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  private async requestWithRetry(
    fn: () => Promise<APIResponse>,
    retries = 2
  ): Promise<APIResponse> {
    const response = await fn();
    if (response.status() === 429 && retries > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return this.requestWithRetry(fn, retries - 1);
    }
    return response;
  }

  async get(endpoint: string): Promise<APIResponse> {
    return this.requestWithRetry(() =>
      this.request.get(`${this.baseUrl}${endpoint}`, {
        headers: this.defaultHeaders,
      })
    );
  }

  async post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.requestWithRetry(() =>
      this.request.post(`${this.baseUrl}${endpoint}`, {
        data,
        headers: this.defaultHeaders,
      })
    );
  }

  async put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.requestWithRetry(() =>
      this.request.put(`${this.baseUrl}${endpoint}`, {
        data,
        headers: this.defaultHeaders,
      })
    );
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.requestWithRetry(() =>
      this.request.delete(`${this.baseUrl}${endpoint}`, {
        headers: this.defaultHeaders,
      })
    );
  }
}