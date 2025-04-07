/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import FlexBox from "@/styles/components/Flexbox";

interface CardProps {
  width?: string;
  height?: string;
  padding?: string;
  flex?: boolean;
}

const BaseCard = styled.div<CardProps>`
  width: ${({ width = "auto" }) => width};
  height: ${({ height = "auto" }) => height};
  padding: ${({ padding = "16px" }) => padding};
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const FlexCard = styled(FlexBox)<CardProps>`
  width: ${({ width = "auto" }) => width};
  height: ${({ height = "auto" }) => height};
  padding: ${({ padding = "16px" }) => padding};
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const Card = (props: CardProps & { children?: React.ReactNode }) => {
  const { flex = true, ...rest } = props;
  return flex ? <FlexCard {...rest} /> : <BaseCard {...rest} />;
};

export default Card;
