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
  padding: ${({ padding = "24px" }) => padding};
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

const FlexCard = styled(FlexBox)<CardProps>`
  width: ${({ width = "auto" }) => width};
  height: ${({ height = "auto" }) => height};
  padding: ${({ padding = "16px" }) => padding};
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Card = (props: CardProps & { children?: React.ReactNode }) => {
  const { flex = true, ...rest } = props;
  return flex ? <FlexCard {...rest} /> : <BaseCard {...rest} />;
};

export default Card;
