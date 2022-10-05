import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Wrapper } from './wrapper';

interface MenuItem {
  path: string;
  name: string;
}

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Clubs', path: '/club' },
  { name: 'Members', path: '/member' },
];

const renderMenuItem = (item: MenuItem) => (
  <S.MenuItem key={item.path}>
    <Link to={item.path}>{item.name}</Link>
  </S.MenuItem>
);

export default function SideBar() {
  return (
    <S.Container>
      <Wrapper>{menuItems.map(renderMenuItem)}</Wrapper>

      <S.MenuItem>
        <form action="/logout" method="post">
          <button type="submit" className="button">
            Logout
          </button>
        </form>
      </S.MenuItem>
    </S.Container>
  );
}

const S = {
  Container: tw.div<any>`
    flex flex-col justify-between
    px-4 pt-2 pb-4
  `,
  MenuItem: tw.div<any>`
    p-2
  `,
};
