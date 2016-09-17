# postcss-easy-media-query

Postcss plugin for easily create media queries. Inspired by [Rupture]() syntax.

It makes available 4 at-rules:
`@above`, `@between`, `@below` and `@breakpoint`:

```css
/* @media screen and (min-width: 768px) */
@above 768px {
  .box {
    width: 25%;
  }
}

/* @media screen and (min-width: 400px) and (max-width: 768px) */
@between 400px 768px {
  .box {
    width: 50%;
  }
}

/* @media screen and (max-width: 400px) */
@below 400px {
  .box {
    width: 100%;
  }
}
```

You can also use `@breakpoint` to store breakpoints in variables:

```css
@breakpoint md 768px;
@breakpoint sm 400px;

/* @media screen and (min-width: 768px) */
@above md {
  .text {
    font-size: 2em;
  }
}

/* @media screen and (min-width: 400px) and (max-width: 768px) */
@between sm md {
  .text {
    font-size: 1.3em
  }
}
```

## installation

`npm install postcss-rupture --save-dev`

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
