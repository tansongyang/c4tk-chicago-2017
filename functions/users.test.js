// const lookupUsers = require('./index');
// const lookupMyInfo = require('./index')
const matchUsers = require('./index')

 test('test getting users', () => {
    var users = matchUsers("QSn75ngF3EN4gNlbn0KrYtJ21TH2");
    return expect(users).resolves.toEqual({"asd":3});
});

// test('test my info', () => {
//     var myInfo = lookupMyInfo({"id":"QSn75ngF3EN4gNlbn0KrYtJ21TH2"});
//     return expect(myInfo).resolves.toEqual({"asd":3});
// });