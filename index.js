var postcss = require('postcss')

module.exports = postcss.plugin('easy-media-query', plugin)

function plugin (opts) {
  opts = opts || {}
  var breakpoints = opts.breakpoints || {}

  return function (root, result) {
    root.walkAtRules(/(above|between|below|breakpoint)/, function (rule) {
      if (rule.name === 'breakpoint') {
        storeBreakpoint(rule.params)
        return rule.remove()
      }
      transformRule(rule)
      rule.name = 'media'
    })
  }

  function storeBreakpoint (params) {
    params = params.split(/\s/)
    breakpoints[params[0]] = params[1]
  }

  function transformRule (rule) {
    var units = getUnits(rule.params)

    rule.params = 'screen and '

    if (rule.name === 'above') {
      rule.params += '(min-width: ' + units[0] + ')'
    }

    if (rule.name === 'below') {
      rule.params += '(max-width: ' + units[0] + ')'
    }

    if (rule.name === 'between') {
      rule.params += '(min-width: ' + units[0] + ') and '
      rule.params += '(max-width: ' + units[1] + ')'
    }
  }

  function getUnits (params) {
    return params.split(/\s/).map(function (param) {
      if (breakpoints.hasOwnProperty(param)) {
        return breakpoints[param]
      }
      return param
    })
  }
}
