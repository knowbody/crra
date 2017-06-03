/**
 * function imports CSS into the css module
 * ex: let styles = requireCSSModule "src/app.css"
 * also note this function is dangerous due to there being no type on the return
 */
external requireCSSModule : string => _ = "require" [@@bs.val];

/* require css file for effect */
external requireCSS : string => string = "require" [@@bs.val];


/**
 * Same as above, adding other name for clarity
 * require an asset (eg. an image) and return exported string value (image URI)
 **/
external requireAssetURI : string => string = "require" [@@bs.val];

external registerServiceWorker : unit => unit =
  "register" [@@bs.module "src/serviceWorker/register"];

external unregisterServiceWOrker : unit => unit =
  "unreigster" [@@bs.module "src/serviceWorker/register"];
