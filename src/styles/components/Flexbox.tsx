import styled from "@emotion/styled";

interface FlexBoxProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  width?: string;
  height?: string;
  gap?: string;
}

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  align-items: ${({ align = "center" }) => align};
  justify-content: ${({ justify = "center" }) => justify};
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "100%" }) => height};
  gap: ${({ gap }) => gap};
`;

export default FlexBox;
