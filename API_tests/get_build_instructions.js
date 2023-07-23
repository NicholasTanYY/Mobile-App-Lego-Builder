// Used for testing the API with endpoint https://rebrickable.com/instructions/{{legoID}}-1

// Test for 200 OK
pm.test('Status code is 200 OK', function () {
  pm.response.to.have.status(200);
});

// Test for HTML Content
pm.test('Response has HTML content', function () {
  pm.expect(pm.response.text()).to.include('<html');
  pm.expect(pm.response.text()).to.include('</html>');
});

// Test for specific LEGO set instructions
pm.test('Response contains instructions for the correct LEGO set', function () {
  const expectedLegoID = '75899';
  const responseHtml = pm.response.text();

  pm.expect(responseHtml).to.include(expectedLegoID);
});
