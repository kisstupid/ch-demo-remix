import tw from 'tailwind-styled-components';

interface StyledWrapperProps {
  $full?: boolean;
  $center?: boolean;
  $flex?: 'row' | 'col';
}

interface WrapperProps extends StyledWrapperProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const StyledWrapper = tw.div<StyledWrapperProps>`
  ${(p) => (p.$flex ? 'flex' + (p.$flex === 'col' ? ' flex-col' : '') : '')}

  ${(p) => (p.$full ? 'h-screen w-screen' : 'h-auto')}

  ${(p) => (p.$center ? 'justify-center items-center' : '')}
`;

export const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <StyledWrapper {...props}>{children}</StyledWrapper>;
};
