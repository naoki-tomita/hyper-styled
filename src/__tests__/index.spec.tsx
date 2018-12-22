import { styled } from "../";

describe("define", () => {
  it("should defined all attributes.", () => {
    const El = styled.div`
      color: green;
    `;
    const result = El({}, []);
    console.log(result);
  });
});
