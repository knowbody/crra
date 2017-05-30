open Jest;
open ExpectJs;

let _ =

describe "Expect" (fun _ => {

	test "toBe" (fun _ => {
		expect (1 + 2) |> toBe 20;
	});

});
