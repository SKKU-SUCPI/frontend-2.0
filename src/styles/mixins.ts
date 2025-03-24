import { css } from "@emotion/react";

export const mixins = {
  flexBox: ({
    direction = "row",
    align = "center",
    justify = "center",
  } = {}) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
  widthHeight: ({ width = "100%", height = "100%" } = {}) => css`
    width: ${width};
    height: ${height};
  `,
};
