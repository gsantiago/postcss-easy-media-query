var postcss = require('postcss')

module.exports = postcss.plugin('easy-media-query', plugin)

function plugin (opts) {
  opts = opts || {}
  var breakpoints = opts.breakpoints || {}

  return function (root, result) {
    root.walkAtRules(/(above|from-width|below|to-width|between(-(from|to))?$|breakpoint)/, function (rule) {
      if (rule.name === 'breakpoint') {
        storeBreakpoint(rule.params)
        return rule.remove()
      }
      rule.params = transformRule(rule.name, getMeasures(rule.params))
      rule.name = 'media'
    })
  }

  function storeBreakpoint (params) {
    params = params.split(/\s/)
    breakpoints[params[0]] = params[1]
  }

  function formatQuery (queryRules) {
    return ['screen'].concat(queryRules).join(' and ')
  }

  function transformRule (name, measures) {
    switch (name) {
      case 'above':
        return formatQuery(['(min-width: ' + (measures[0] + 1) + 'px)'])
      case 'from-width':
        return formatQuery(['(min-width: ' + measures[0] + 'px)'])
      case 'below':
        return formatQuery(['(max-width: ' + (measures[0] - 1) + 'px)'])
      case 'to-width':
        return formatQuery(['(max-width: ' + measures[0] + 'px)'])
      case 'between':
        return formatQuery([
          '(min-width: ' + (measures[0] + 1) + 'px)',
          '(max-width: ' + (measures[1] - 1) + 'px)'
        ])
      case 'between-from':
        return formatQuery([
          '(min-width: ' + measures[0] + 'px)',
          '(max-width: ' + (measures[1] - 1) + 'px)'
        ])
      case 'between-to':
        return formatQuery([
          '(min-width: ' + (measures[0] + 1) + 'px)',
          '(max-width: ' + measures[1] + 'px)'
        ])
    }
  }

  function parseBreakpointUnit (unit) {
    return typeof unit === 'string'
      ? parseInt(unit.replace('px', ''))
      : unit
  }

  function getMeasures (params) {
    return params.split(/\s/).map(function (param) {
      if (breakpoints.hasOwnProperty(param)) {
        return parseBreakpointUnit(breakpoints[param])
      }
      return parseBreakpointUnit(param)
    })
  }
}
