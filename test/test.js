/* globals describe, it, beforeEach, imageIndexer */
var assert = require('assert');
var executor = require('./functionHelper');
var imageIndexer = require('../lib/imageIndexer');

describe('Image Indexer', function () {
   describe('current is null', function () {
      it('should return null when imageIndexer is required', function () {
         assert.equal(imageIndexer.current(), null);
      });
   });

   describe('set collection ', function () {
      it('should return correct size after set operation', function () {
         var data = [{ id: 1, name: 'bob' }, { id: 4, name: 'ray' }];
         imageIndexer.set(data);
         assert.equal(imageIndexer.size(), data.length);
      });
   });
});

describe('collection modifications', function () {   
   var data = [{ id: 1, name: 'bob' }, { id: 4, name: 'ray' }];
   
   beforeEach(function () {
         imageIndexer.set(data);
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
   });
});

describe('collection modifications', function () {
   var data = [{ id: 1, name: 'bob' }, { id: 4, name: 'ray' }];
   
   beforeEach(function () {
         imageIndexer.set(data);
      }
   );
   
   it('add and next followed by another next should return correct object', function () {
      imageIndexer.add({ id: 82, name: 'ann' });
      executor.exec(imageIndexer.next, 2);

      var obj = imageIndexer.current();
      assert(obj != null);
      assert.equal(obj.id, 82);
   });
});
 
describe('collection loop back', function () {
   var data = [{ id: 11, name: 'bob' }, { id: 4, name: 'ray' }];
   
   beforeEach(function () {
         imageIndexer.set(data);
      }
   );
   
   it('next will loop back to beginning', function () {
      imageIndexer.add({ id: 100, name: 'barry' });
      executor.exec(imageIndexer.next, 3);

      var obj = imageIndexer.current();
      assert(obj != null);
      assert.equal(obj.id, 11);
   });
});