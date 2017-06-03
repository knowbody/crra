## vim / neovim

When running in development with `webpack-dev-server`, you might notice that webpack doesn't always respond to changes when you hit save. This is because vim's default saving strategy sometimes writes directly to the original file, but other times renames the file and writes to a temporary one, which causes issues with watching changes. To fix this, add `set backupcopy=yes` in your `.vimrc` (see http://vimdoc.sourceforge.net/htmldoc/options.html#'backupcopy')
t
