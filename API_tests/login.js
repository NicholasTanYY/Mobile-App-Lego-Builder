// Test for Successful Login
pm.test('Successful login with correct credentials', function () {
  const username = '1';
  const password = '2';

  // Make the login request with the correct credentials
  pm.sendRequest({
    url: 'https://orbital-tss-server.onrender.com/api/login',
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: {
      mode: 'raw',
      raw: JSON.stringify({ username: username, password: password }),
    },
  });

  // Assertions based on the response
  pm.expect(pm.response).to.have.status(200);
  pm.expect(pm.response.json().data).to.eql('Login successful');
});

// Test for Incorrect Password
pm.test('Login fails with incorrect password', function () {
  const username = '1';
  const incorrectPassword = 'wiojbvj';

  // Make the login request with an incorrect password
  pm.sendRequest({
    url: 'https://orbital-tss-server.onrender.com/api/login',
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: {
      mode: 'raw',
      raw: JSON.stringify({ username: username, password: incorrectPassword }),
    },
  });

  // Assertions based on the response
  pm.expect(pm.response).to.have.status(200);
  pm.expect(pm.response.json().error).to.eql('Incorrect username or password!');
});
