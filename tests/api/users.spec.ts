import {
    test,
    expect
} from '@playwright/test';
import { ApiClient } from '@api/ApiClients';
import { UsersAPI } from '@api/UsersApi';

test.describe('Users API', () => {

    test('can retrieve users', async ({ request }) => {

        // Initialize ApiClient using Playwright's request fixture
        const client = new ApiClient(
            request,
            'https://reqres.in'
        );

        // Initialize UsersApi using our ApiClient
        const usersAPI = new UsersAPI(client);

        // Make API request
        const response = await usersAPI.getUsers();

        // Validate response
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data).toBeDefined();
        expect(body.data.length).toBeGreaterThan(0);
    });

    test('can retrieve a specific user', async ({ request }) => {

        // Initialize ApiClient using Playwright's request fixture
        const client = new ApiClient(
            request,
            'https://reqres.in'

        );

        // Initialize UsersApi using our ApiClient
        const usersAPI = new UsersAPI(client);

        const response = await usersAPI.getUser(2);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data.id).toBe(2);

    });

    test('can create a user', async ({ request }) => {
        const client = new ApiClient(
            request,
            'https://reqres.in'
        );

        const usersApi = new UsersAPI(client);

        const response = await usersApi.createUser(
            'Jerome',
            'QA Engineer'
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.name).toBe('Jerome');
        expect(body.job).toBe('QA Engineer');
    });


})