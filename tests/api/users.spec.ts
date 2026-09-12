import { test, expect } from '@playwright/test';
import { ApiClient } from '@api/ApiClients';
import { UsersAPI } from '@api/UsersApi';
import { config } from '@config/env';
import { randomName, randomJobTitle } from '@utils/test-data'

test.describe('Users API', () => {

    const buildClient = (request: any) =>
        new ApiClient(request, config.apiBaseURL, {
            'x-api-key': config.reqresApiKey,
        });

    test('can retrieve users', async ({ request }) => {
        const usersAPI = new UsersAPI(buildClient(request));
        const response = await usersAPI.getUsers(1);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toBeDefined();
        expect(body.data.length).toBeGreaterThan(0);
    });

    test('can retrieve a specific user', async ({ request }) => {
        const usersAPI = new UsersAPI(buildClient(request));
        const response = await usersAPI.getUser(2);

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.id).toBe(2);
    });

    test('can create a user', async ({ request }) => {
        const usersAPI = new UsersAPI(buildClient(request));
        const name = randomName();
        const job = randomJobTitle();
        const response = await usersAPI.createUser(name, job);

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.name).toBe(name);
        expect(body.job).toBe(job);
    });
});