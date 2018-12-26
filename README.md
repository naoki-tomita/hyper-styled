# hyper-styled

styled-components like styler for hyperapp.

## it can be

* define styled component.
  ```jsx
  const { h, app } = require("hyperapp");
  const { styled } = require("hyper-styled");
  const Styled = styled.div`
    font-size: 30px;
  `;

  app({}, {}, <Styled>Hello world</Styled>, document.body);
  ```
* define attribute receiveable styled component.
  ```jsx
  // define
  const Colored = styled.div`
    color: ${({ color }) => color};
  `;
  // use
  render(<Colored color="blue">Blue</Colored>);
  ```

* &::before, &::after, &:hover, etc...
  ```tsx
  styled.div`
    &:before {
      content: "---";
    }
  `;
  ```
* attribute type definition.
  ```tsx
  const Comp = styled.div<{ color: string }>`
    color: ${({ color }) => color};
  `;
  ```

## it can not be

* @keyframes
  ```tsx
  const Comp = styled.div`
    animation: foo 1s;
    @keyframes foo {
      0% {
        background-color: yellow;
      }

      100% {
        background-color: green;
      }
    }
  `;
  ```
