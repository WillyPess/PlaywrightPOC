const { test, expect, request } = require('@playwright/test');


test('Fetch all projects and delete them', async () => {
  //  a new API request context
  const apiContext = await request.newContext();

  const token = '3PUgAkBbeTV2Us5NVyXW';

  const apiUrl = 'http://localhost/api/v4/projects/';
  const requestBody = {
    name: 'playtest'
  };

  const response = await apiContext.post(apiUrl, {
    data: requestBody, // Pass the body as JSON
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    },
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody).toHaveProperty('id'); 
  expect(responseBody.name).toBe('playtest'); 

  const getResponse = await apiContext.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  expect(getResponse.status()).toBe(200);

  const projects = await getResponse.json();

  console.log(`Fetched Projects:`, projects);

  for (const project of projects) {
    const deleteUrl = `${apiUrl}${project.id}`; 
    const deleteResponse = await apiContext.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    expect(deleteResponse.status()).toBeGreaterThanOrEqual(200);
    expect(deleteResponse.status()).toBeLessThan(300);

    console.log(`Deleted Project ID: ${project.id}`);
  }

  const verifyResponse = await apiContext.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  expect(verifyResponse.status()).toBe(200);
  const remainingProjects = await verifyResponse.json();
  expect(remainingProjects.length).toBe(0); 
  console.log('All projects deleted successfully.');
});
