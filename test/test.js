/* globals describe, it, beforeEach, imageIndexer */
var assert = require('assert');
var imageIndexer = require('../lib/imageIndexer');

describe('Image Indexer', function () {
   describe('current is null', function () {
      it('should return null when imageIndexer is required', function () {
         assert.equal(imageIndexer.current(), null);
         console.log('test 1 size is ' + imageIndexer.size());
      });
   });

   describe('set collection ', function () {
      it('should return correct size after set operation', function () {
         var data = [{ id: 1, name: 'bob' }, { id: 4, name: 'ray' }];
         imageIndexer.set(data);
         assert.equal(imageIndexer.size(), data.length);
         console.log('test 2 size is ' + imageIndexer.size());
      });
   });
});

describe('collection modifications', function () {
   
   var data = [{ id: 1, name: 'bob' }, { id: 4, name: 'ray' }];
   
   beforeEach(function () {
         imageIndexer.set(data);
         console.log('beforeEach');
      }
   );

   it('current should return non-null object after collection initialization', function () {
      assert(imageIndexer.current() != null);
   });

   it('next should return non-null object after collection initialization', function () {
      assert(imageIndexer.next() != null);
   });

   it('add should return correct updated size', function () {
      imageIndexer.add({ id: 78, name: 'ann' });
      assert.equal(imageIndexer.size(), 3);
      imageIndexer.add({ id: 79, name: 'jim' });
      assert.equal(imageIndexer.size(), 4);
      console.log('test 3 size is ' + imageIndexer.size());
   });
});


describe('collection modifications', function () {
   var data = [{ id: 1, name: 'bob' }, { id: 4, name: 'ray' }];
   
   beforeEach(function () {
         imageIndexer.set(data);
         console.log('beforeEach');
      }
   );
   
   it('add and next followed by another next should return correct object', function () {
      imageIndexer.add({ id: 82, name: 'ann' });
      imageIndexer.next();
      imageIndexer.next();

      var obj = imageIndexer.current();
      assert(obj != null);
      assert.equal(obj.id, 82);
   });
});
 
describe('collection loop back', function () {
   var data = [{ id: 11, name: 'bob' }, { id: 4, name: 'ray' }];
   
   beforeEach(function () {
         imageIndexer.set(data);
         console.log('beforeEach');
      }
   );
   
   it('next will loop back to beginning', function () {
      imageIndexer.add({ id: 100, name: 'barry' });
      imageIndexer.next();
      imageIndexer.next();
      imageIndexer.next();

      var obj = imageIndexer.current();
      assert(obj != null);
      assert.equal(obj.id, 11);
   });
});