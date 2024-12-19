const { test, expect, request } = require('@playwright/test');


test('POST API to create a project with name "playtest" and access token', async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Define the access token
  const token = '3PUgAkBbeTV2Us5NVyXW';

  // Define the API endpoint and request body
  const apiUrl = 'http://localhost/api/v4/projects/';
  const requestBody = {
    name: 'playtest'
  };

  const response = await apiContext.post(apiUrl, {
    data: requestBody, // Pass the body as JSON
    headers: {
      'Content-Type': 'application/json', // Ensure the body is treated as JSON
      'Authorization': `Bearer ${token}` // Include the access token
    },
  });

  // Assert the response status is 201 (Created)
  expect(response.status()).toBe(201);

  // Get the response body
  const responseBody = await response.json();

  // Log the response body
  console.log(responseBody);

  // Validate the response structure
  expect(responseBody).toHaveProperty('id'); // Check if the response contains an 'id'
  expect(responseBody.name).toBe('playtest'); // Ensure the name matches the input
});


test('Fetch all projects and delete them', async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Define the access token
  const token = '3PUgAkBbeTV2Us5NVyXW';

  // API base URL
  const apiUrl = 'http://localhost/api/v4/projects/';

  // Step 1: Fetch all projects
  const getResponse = await apiContext.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  // Assert the response status is 200 (OK)
  expect(getResponse.status()).toBe(200);

  // Parse the response body
  const projects = await getResponse.json();

  // Log all fetched projects
  console.log(`Fetched Projects:`, projects);

  // Step 2: Delete each project
  for (const project of projects) {
    const deleteUrl = `${apiUrl}${project.id}`; // Construct the DELETE endpoint for the project
    const deleteResponse = await apiContext.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    // Assert the DELETE response status is 200 (or 204 based on API spec)
    expect(deleteResponse.status()).toBeGreaterThanOrEqual(200);
    expect(deleteResponse.status()).toBeLessThan(300);

    console.log(`Deleted Project ID: ${project.id}`);
  }

  // Step 3: Verify all projects are deleted
  const verifyResponse = await apiContext.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  expect(verifyResponse.status()).toBe(200);
  const remainingProjects = await verifyResponse.json();
  expect(remainingProjects.length).toBe(0); // Ensure no projects remain

  console.log('All projects deleted successfully.');
});
