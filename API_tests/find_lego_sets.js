// Used for testing the API with endpoint https://rebrickable.com/api/v3/lego/sets/{{legoID}}-1

// Test for 200 OK
pm.test('Status code is 200 OK', function () {
  pm.response.to.have.status(200);
});

// Test for JSON Content
pm.test('Response has correct structure', function () {
  pm.response.to.be.json;
  pm.response.to.have.jsonBody('set_num');
  pm.response.to.have.jsonBody('name');
  pm.response.to.have.jsonBody('year');
  pm.response.to.have.jsonBody('theme_id');
  pm.response.to.have.jsonBody('num_parts');
  pm.response.to.have.jsonBody('set_img_url');
  pm.response.to.have.jsonBody('set_url');
  pm.response.to.have.jsonBody('last_modified_dt');
});

// Test for Specific Field Values
pm.test("Response 'name' field is a string", function () {
  pm.expect(pm.response.json().name).to.be.a('string');
});

pm.test("Response 'year' field is a number", function () {
  pm.expect(pm.response.json().year).to.be.a('number');
});

// Test for Valid URL Format
pm.test("Response 'set_img_url' field is a valid URL", function () {
  const imageUrl = pm.response.json().set_img_url;
  pm.expect(imageUrl).to.be.a('string');
  pm.expect(imageUrl).to.match(/^https?:\/\/.+$/);
});

pm.test("Response 'set_url' field is a valid URL", function () {
  const setUrl = pm.response.json().set_url;
  pm.expect(setUrl).to.be.a('string');
  pm.expect(setUrl).to.match(/^https?:\/\/.+$/);
});
