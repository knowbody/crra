open Utils;

requireCSS "src/app.css";

module App = {
  include ReactRe.Component;
  type props = {title: string};
  let name = "App";
  let handleClick _ _ => {
    Js.log "clicked!";
    None
  };
  let render {props, updater} =>
    <div className="app">
      <div className="appHeader">
        <div
          onClick=(updater handleClick)
          style=(
            ReactDOMRe.Style.make
              display::"flex" width::"200px" backgroundColor::"#db4d3f" cursor::"pointer" ()
          )>
          <img className="appLogo" src=(requireAssetURI "src/logo.svg") />
        </div>
        <h2 style=(ReactDOMRe.Style.make marginLeft::"30px" fontSize::"2em" ())>
          (ReactRe.stringToElement props.title)
        </h2>
      </div>
      <p className="appIntro">
        (ReactRe.stringToElement "To get started, edit ")
        <code> (ReactRe.stringToElement "src/app.re") </code>
        (ReactRe.stringToElement " and save to reload.")
      </p>
    </div>;
};

include ReactRe.CreateComponent App;

let createElement ::title => wrapProps {title: title};
