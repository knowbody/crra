/**
 * function imports CSS into the css module
 * ex: let styles = requireCSSModule "src/app.css"
 * compiles to var styles = require("src/app.css")
 * also note this function is dangerous due to there being no type on the return
 */
external requireCSSModule : string => _ = "require" [@@bs.val];


/**
 * require css file
 * ex: requireCSS "src/app.css"
 * compiles to require("src/app.css")
 **/
external requireCSS : string => string = "require" [@@bs.val];


/**
 * Same as above, adding other name for clarity
 * require an asset (eg. an image) and return exported string value (image URI)
 **/
external requireAssetURI : string => string = "require" [@@bs.val];

/* register service worker */
external registerServiceWorker : unit => unit =
  "register" [@@bs.module "src/serviceWorker/register"];

/* unregister service worker, not reliable yet */
external unregisterServiceWOrker : unit => unit =
  "unreigster" [@@bs.module "src/serviceWorker/register"];
