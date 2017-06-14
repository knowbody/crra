open Jest;

open ExpectJs;

let _ =
  describe
    "src/app.re"
    (
      fun _ => {
        test
          "is defined"
          (
            fun _ => {
              let component = ReactShallowRenderer.renderWithRenderer <App title="Foo Title" />;
              expect (Js.Undefined.return component) |> toBeDefined
            }
          );
        test
          "renders"
          (
            fun _ => {
              let tree = <App title="Foo Title" /> |> ReactShallowRenderer.renderWithRenderer;
              expect tree |> toMatchSnapshot
            }
          )
      }
    );
