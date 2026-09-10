import { APIResponse } from '@playwright/test';
import { ApiClient } from '@api/ApiClients';

export class UsersAPI {
    readonly client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async getUsers(page = 2): Promise<APIResponse> {
        return await this.client.get(`/api/users?page=${page}`)
    }

    async getUser(userId: number): Promise<APIResponse> {
        return await this.client.get(`/api/users/${userId}`);
    }

    async createUser(
        name: string,
        job: string,
    ): Promise<APIResponse> {
        return await this.client.post(`/api/users`, {
            name,
            job
        });
    }
}