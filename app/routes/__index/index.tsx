import { Link } from 'react-router-dom';

import { Wrapper } from '~/layouts/wrapper';

export default function Index() {
  return (
    <Wrapper $full $center $flex="col">
      <div>Wellcome to Friday.com</div>
      <Link to="/dashboard">Access our application</Link>
    </Wrapper>
  );
}
