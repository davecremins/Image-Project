/* globals describe, it, beforeEach, imageIndexer */
var assert = require('assert');

describe('Image Indexer', function () {
   
   describe('current is null', function () {
      var imageIndexer = require('../lib/imageIndexer');
      it('should return null when imageIndexer is required', function () {
         assert.equal(null, imageIndexer.current());
      });
   });
   
   describe('set collection ', function () {
      var imageIndexer = require('../lib/imageIndexer');
      it('should return correct size after set operation', function () {
         var data = [{id: 1, name: 'bob'}, {id: 4, name: 'ray'}];
         imageIndexer.set(data);
         assert.equal(data.length, imageIndexer.size());
      });
   });
   
   describe('collection modifications', function () {
      var imageIndexer = require('../lib/imageIndexer');
      var data = [{id: 1, name: 'bob'}, {id: 4, name: 'ray'}];
      
      beforeEach(
         function () {
            imageIndexer.set(data);
         }
      );
      
      it('current should return non-null object after collection initialization', function () {
         assert(imageIndexer.current() != null);
      });
      
      it('next should return non-null object after collection initialization', function () {
         assert(imageIndexer.next() != null);
      });
   });
   
});