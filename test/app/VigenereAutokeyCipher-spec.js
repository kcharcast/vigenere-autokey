var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    vac,
    VAC = require('../../app/VigenereAutokeyCipher.js');

describe('Vigenere Autokey Cipher', function(){

    it('should be able to instantiate without params', function(){
        vac = new VAC();
    });

    it('should instantiate with default value', function(){
        expect(vac).to.have.property('key', 'vigenere');
        expect(vac).to.have.property('alpha', 'abcdefghijklmnopqrstuvwxyz');
    });

    describe('method: caesarshift', function(){

        it('should return a string', function(){
            expect(vac.caesarshift('k', 2)).to.be.a('string');
        });

        it('should shift correctly according to increment', function(){
            assert.equal(vac.caesarshift('a', 1), 'b');
        });     
    });

    describe('method: caesarunshift', function(){

        it('should return a string', function(){
            expect(vac.caesarunshift('k', 2)).to.be.a('string');
        });

        it('should unshift correctly according to decrement', function(){
            assert.equal(vac.caesarunshift('b', 1), 'a');
        });     
    });

    describe('method: _code', function() {
        vac = new VAC();
        var shift = vac.caesarshift,
            test,
            unshift = vac.caesarunshift;

        it('should call caesarshift on encode', function(){
            test = 'not called';
            vac.caesarshift = function(){
                test = 'called';
            };
            vac._code('test', 'encode');
            assert.equal(test, 'called', 'caesarshift method is not called');
            vac.caesarshift = shift;
        });

        it('should call caesarushift on decode', function(){
            test = 'not called';
            vac.caesarunshift = function(){
                test = 'called';
            };
            vac._code('test', 'decode');
            assert.equal(test, 'called', 'caesarunshift method is not called');
            vac.caesarushift = unshift;
        });

        it('should return a string', function(){
            expect(vac._code('test', 'encode')).to.be.a('string');
            expect(vac._code('test', 'decode')).to.be.a('string');
        });
    });

});