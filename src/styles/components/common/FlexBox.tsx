import styled from "@emotion/styled";

const FlexBox = styled.div<{
  justify?: string;
  align?: string;
  direction?: string;
  gap?: string;
}>`
  ${({ theme, direction = "row", align = "center", justify = "center" }) =>
    theme.mixins.flexBox({ direction, align, justify })};
  gap: ${({ gap }) => gap || "0"};
`;

export default FlexBox;
