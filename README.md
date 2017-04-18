# postcss-easy-media-query

[![Build Status](https://travis-ci.org/gsantiago/postcss-easy-media-query.svg?branch=master)](https://travis-ci.org/gsantiago/postcss-easy-media-query)
[![npm version](https://badge.fury.io/js/postcss-easy-media-query.svg)](http://badge.fury.io/js/postcss-easy-media-query)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Postcss plugin for easily create media queries. Inspired by [Rupture](https://github.com/jescalan/rupture) syntax.

The plugin exposes the following media query at-rules:
* `@above`
* `@from-width` (min inclusive)
* `@below`
* `@to-width` (max inclusive)
* `@between`
* `@between-from` (min inclusive)
* `@between-to` (max inclusive)

And `@breakpoint` for defining a breakpoint.

### Examples 

```css
@above 768px {}
/* @media screen and (min-width: 769px) {} */

@from-width 768px {}
/* @media screen and (min-width: 768px) {} */

@below 400px {}
/* @media screen and (max-width: 399px) {} */

@to-width 400px {}
/* @media screen and (max-width: 400px) {} */

@between 400px 768px {}
/* @media screen and (min-width: 401px) and (max-width: 767px) {} */

@between-from 400px 768px {}
/* @media screen and (min-width: 400px) and (max-width: 767px) {} */

@between-to 400px 768px {}
/* @media screen and (min-width: 400px) and (max-width: 768px) {} */
```

```css
@breakpoint md 768px;
@breakpoint sm 400px;

/* @media screen and (min-width: 768px) */
@from-width md {
  .text {
    font-size: 2em;
  }
}

/* @media screen and (min-width: 400px) and (max-width: 767px) */
@between-from sm md {
  .text {
    font-size: 1.3em
  }
}
```

## installation

`npm install postcss-easy-media-query --save-dev`

## tests

`npm install && npm test`

## usage

```js
var postcss = require('postcss')
var easyMediaQuery = require('postcss-easy-media-query')

postcss([easyMediaQuery()])
```

## options

### `breakpoints: Object`

Set the default breakpoints:

```js
postcss([easyMediaQuery({
  breakpoints: {
    tablet: '800px',
    mobile: '600px'
  }
})])
```

Then you can use the defined breakpoints in your CSS:

```css
@above tablet {
  /* ... */
}

@between mobile tablet {
  /* ... */
}
```

## license

MIT
