### Note

All CSS/File import functions must have the full path from the root directory

for example
```
root
  ├── src
  │   ├── App
  │   │   ├── app.re
  │   │   ├── app.css
```

If I was in `app.re` and want to access `app.css`, I need to use `requireCss "src/App/app.css"`.

### Regular CSS
See example below on how to add regular CSS to your Component

```
open Utils;

requireCSS "src/app.css";

module App = {
  include ReactRe.Component;
  type props = unit;
  let name = "App";
  let render {props, updater} =>
  <div className=styles##app>
    <div className=styles##appHeader>
      (ReactRe.stringToElement "Welcome!")
    </div>
  </div>;
};

include ReactRe.CreateComponent App;

let createElement => wrapProps ();

```


### CSS Modules

CSS Modules can be extremely useful for keeping your CSS scoped only to component.
Instead of having to worry about clashing class names, you can let webpack do the heavy lifting by changing your class names in a programmatic way.

For example, let's say we had our `app.css` file like so:

```css
.app {
  background-color: orange;
}
.appHeader {
  color: red;
  width: 200px;
  height: 50px;
}
```

and our component in `app.re`

```
  let render {props, updater} =>
  <div className="app">
    <div className="appHeader">
      (ReactRe.stringToElement "Welcome!")
    </div>
  </div>;
};
```

CSS Modules could potentially change them both to the following

`app.css`

```css
.app_81a91 {
  background-color: orange;
}
. {
  color: red;
  width: 200px;
  height: 50px;
}
```

and `app.re`
(keep in mind this will happen to the `.js` version of this file at compilation)
```
  let render {props, updater} =>
  <div className="app_81a91">
    <div className="appHeader_yowp0">
      (ReactRe.stringToElement "Welcome!")
    </div>
  </div>;
};
```

Ta da! Your CSS is not scoped by CSS file!

To read more about the benefits of using CSS Modules checkout the [CSS Modules git repository](https://github.com/css-modules/css-modules)


To enable this in CRRA, you need to prepend your npm/yarn run commands with `MODULES=true`.

For example `MODULES=true yarn dev` or `MODULES=true npm run build`;

To use styling in your `.re` files, one would do the following:


```
open Utils;


module App = {
  include ReactRe.Component;
  type props = unit;
  let styles = requireCSSModules "src/app.css";
  let name = "App";
  let render {props, updater} =>
  <div className=styles##app>
    <div className=styles##appHeader>
      (ReactRe.stringToElement "Welcome!")
    </div>
  </div>;
};

include ReactRe.CreateComponent App;

let createElement => wrapProps ();

```

Notice the `open Utils;` at the top. This gives you acces to the `requireCSSModules` function.
