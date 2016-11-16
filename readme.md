# Clever Scrollbar

Its simple sidebar which helps to navigate on web page.

It is not a replacement of Default Browser Scrollbar. It's an addition to it.

Check example on [believer-ufa.github.io/clever-scrollbar/](https://believer-ufa.github.io/clever-scrollbar/)

### Setup

1. Add library script

```html
<script src="dist/clever-scrollbar.js"></script>
```

Or install from NPM as module:

```bash
npm i clever-scrollbar
```

2. Add additional attributes to main sections on you page

```html
<body>

    <div class='head' data-content-block="Header">...</div>

    <div class='article-content' data-content-block="Article text">...</div>

    <div class='comments' data-content-block="Users's comments">...</div>

</body>

```

3. And execute `CleverScrollbar.load()` method after loading all content!

```js
window.addEventListener("load", function() {
    CleverScrollbar.load()
})
```

### Options

#### Load default stylesheets?

If you want to prevent loading default styles of library, you can use this approach:

```js
CleverScrollbar.load({
  loadStyles : false
})
```


This is all of you need.

### Additional classes

If you need to set some additional classes to one of blocks of sidebar, you can do this with additional attribute:

```
<div
    class='article-content'
    data-content-block="Article text"
    data-content-block-classes='main-content-block other-class'
>...</div>
```

### Ajax and SPA applications

If you webpage content changed withoud full reload, you can use method `CleverScrollbar.reload()`
to update you sidebar.

### Stopping

Run `CleverScrollbar.stop()` to disable library. You can load it again later.