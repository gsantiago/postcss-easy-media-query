var assert = require('assert')
var postcss = require('postcss')
var easyMediaQuery = require('..')
var fs = require('fs')
var path = require('path')
var glob = require('glob')
var sourcePath = path.join(__dirname, 'source')
var expectedPath = path.join(__dirname, 'expected')

var sources = glob.sync('*.css', {cwd: sourcePath})

describe('Tests', function () {
  sources.forEach(function (file) {
    it(file, function (done) {
      if (file === 'breakpoints-from-opts.css') {
        return matchExpected(file, done, {
          breakpoints: {
            tablet: '800px',
            mobile: '600px'
          }
        })
      }
      matchExpected(file, done)
    })
  })
})

function matchExpected (file, done, opts) {
  var opts = opts || {}
  var src = fs.readFileSync(path.join(sourcePath, file), 'utf8')
  var expected = fs.readFileSync(path.join(expectedPath, file), 'utf8')
  var result = postcss(easyMediaQuery(opts)).process(src).css
  assert.strictEqual(result, expected)
  done()
}
