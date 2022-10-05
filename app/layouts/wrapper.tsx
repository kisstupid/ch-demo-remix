import tw from 'tailwind-styled-components';

interface StyledWrapperProps {
  $full?: boolean | 'view';
  $center?: boolean;
  $flex?: 'row' | 'col';
}

interface WrapperProps extends StyledWrapperProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const StyledWrapper = tw.div<StyledWrapperProps>`
  ${(p) => (p.$flex ? 'flex' + (p.$flex === 'col' ? ' flex-col' : '') : '')}

  ${({ $full }) => {
    if (typeof $full === 'boolean' && $full) return 'h-screen w-screen';

    if ($full === 'view') return 'h-full w-full';
  }}

  ${(p) => (p.$center ? 'justify-center items-center' : '')}
`;

export const Wrapper = ({ children, ...props }: WrapperProps) => {
  return <StyledWrapper {...props}>{children}</StyledWrapper>;
};
