/* require css file for side effect only */
external requireCSS : string => _ = "require" [@@bs.val];

/* require an asset (eg. an image) and return exported string value (image URI) */
external requireAssetURI : string => string = "require" [@@bs.val];
