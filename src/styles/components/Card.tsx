/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import FlexBox from "@/styles/components/Flexbox";

interface CardProps {
  width?: string;
  height?: string;
  padding?: string;
}

const Card = styled(FlexBox)<CardProps>`
  width: ${({ width = "auto" }) => width};
  height: ${({ height = "auto" }) => height};
  padding: ${({ padding = "16px" }) => padding};
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export default Card;
