const lookupUsers = require('./index');

test('test getting users', () => {
    var users = lookupUsers();
    expect(users).resolves.toEqual({"asd":3});
    expect(1).toEqual(2);
});