import tw from 'tailwind-styled-components';

import { Wrapper } from '~/layouts/wrapper';

export default function Dashboard() {
  return (
    <Wrapper $flex="row" className="gap-4">
      <S.Card>
        <h5>Tiền ăn nhậu tháng này</h5>
      </S.Card>

      <S.Card>
        <h5>Lương tháng này</h5>
      </S.Card>
    </Wrapper>
  );
}

const S = {
  Card: tw.div<any>`
    rounded-md border border-gray-400 inline-block p-4
  `,
};
