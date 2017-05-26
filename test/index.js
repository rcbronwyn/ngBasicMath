/*Tests for the Reverse Polish Notation Conversion and Post Fix Notation*/
var chai = require('chai');
var assert = chai.assert;


var path = 'scripts/js/parser.js';
var fs = require('fs');
var vm = require('vm');

var code = fs.readFileSync(path);
vm.runInThisContext(code);

describe('mathInput', function(){
    it ('should return 3 when passed 1 + 2', function(){
        var result = evaluateExpression('1+2');
        assert.equal(result,3);
        result = evaluateExpression('1 + 2');
        assert.equal(result,3);
        result = evaluateExpression(' 1 +2');
        assert.equal(result,3);
    });
    it ('should return 2 when passed 4 - 2', function(){
        var result = evaluateExpression('4 -2');
        assert.equal(result,2);
        result = evaluateExpression('4-2');
        assert.equal(result,2);
        result = evaluateExpression('4 -2');
        assert.equal(result,2);
    });    
    it ('should return 6 when passed 12 / 2', function(){
        var result = evaluateExpression('12 / 2');
        assert.equal(result,6);
        result = evaluateExpression('12/2');
        assert.equal(result,6);
        result = evaluateExpression('12 /2');
        assert.equal(result,6);
        result = evaluateExpression('1 2 /2');
        assert.equal(result,6);
    });   
    it ('should return 48 when passed 8 * 6', function(){
        var result = evaluateExpression('8 * 6');
        assert.equal(result,48);
        result = evaluateExpression('8*6');
        assert.equal(result,48);
        result = evaluateExpression('8 *6');
        assert.equal(result,48);
    });           
    it ('should return 7 when passed 1 + 2 * 3', function(){
        var result = evaluateExpression('1 + 2 * 3');
        assert.equal(result,7);
        result = evaluateExpression('1+2 *3');
        assert.equal(result,7);
    });           
    it ('should return 7 when passed 2 * 3 + 1', function(){
        var result = evaluateExpression('2 * 3 + 1');
        assert.equal(result,7);    
    });         
    it ('should return 21 when passed 5 + 6 / 2 * 5 + 1', function(){
        var result = evaluateExpression('5 + 6 / 2 * 5 + 1');
        assert.equal(result,21);    
    });             
        
})