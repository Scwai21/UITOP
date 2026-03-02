import { test, expect } from '@playwright/test';

test.describe('Task 2: API Testing', () => {
    
    const baseURL = 'https://automationexercise.com/api';
    
    test('Positive: Get All Products List', async ({ request }) => {
        const response = await request.get(`${baseURL}/productsList`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.products).toBeDefined();
        expect(responseBody.products.length).toBeGreaterThan(0);
    });

    
    test('Negative: POST to verify login without email and password parameters', async ({ request }) => {
        const response = await request.post(`${baseURL}/verifyLogin`, {
        form: {},
        })
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

});