var expect = require('chai').expect;
var Index = "../index";
var mockery = require('mockery');

var mock_index_module = {
    request: function() {
        return "I'm mocking";
    }
}
var mock_special_module = {
    get_rest_api: function() {
        return 'mock special rest api';
    }
}
// module FakeSpecial {
// module Special {
//     function get_rest_api() {
//         return 'mock special rest api';
//     };
// }
// }
describe('Array', function() {

    describe('mockery testing', function () {
        it('is no mock testing', function() {
            var index = require(Index);
            expect(index.request()).to.equal('real http request result');            
        });
        it('mocks index', function() {
            mockery.registerAllowable(Index);
            mockery.registerMock(Index, mock_index_module);
            mockery.enable({ useCleanCache: true});
            var index = require(Index);
            expect(index.request()).to.equal("I'm mocking");
            // expect(index.other_request()).to.equal('real other response body'); // error
            mockery.disable();
            mockery.deregisterAll();
        })

        it('mocks special', function() {
            mockery.registerAllowable(Index);
            mockery.registerMock("./special", mock_special_module);
            mockery.enable({ useCleanCache: true}); // 要注意。指定しないと動かない。useCleanChache と間違えてた。
            var index = require(Index);
            expect(index.request()).to.equal("mock special rest api");
            mockery.disable();
            mockery.deregisterAll();
        })
    });
});