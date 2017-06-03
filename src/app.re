open Utils;

let styles = requireCSSModule "src/app.css";

module App = {
  include ReactRe.Component;
  type props = {title: string};
  let name = "App";
  let handleClick _ _ => {
    Js.log styles;
    Js.log "clicked!";
    None
  };
  let render {props, updater} =>
    <div className=styles##app>
      <div className=styles##appHeader>
        <div
          onClick=(updater handleClick)
          style=(
            ReactDOMRe.Style.make
              display::"flex" width::"200px" backgroundColor::"#db4d3f" cursor::"pointer" ()
          )>
          <img className=styles##appLogo src=(requireAssetURI "src/logo.svg") />
        </div>
        <h2 style=(ReactDOMRe.Style.make marginLeft::"30px" fontSize::"2em" ())>
          (ReactRe.stringToElement props.title)
        </h2>
      </div>
      <p className=styles##appIntro>
        (ReactRe.stringToElement "To get started, edit ")
        <code> (ReactRe.stringToElement "src/app.re") </code>
        (ReactRe.stringToElement " and save to reload.")
      </p>
    </div>;
};

include ReactRe.CreateComponent App;

let createElement ::title => wrapProps {title: title};
