import { Link } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Clubs', path: '/club' },
  { name: 'Members', path: '/member' },
];

export default function SideBar() {
  return (
    <ul>
      {menuItems.map((item) => (
        <li key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}

      <form action="/logout" method="post">
        <button type="submit" className="button">
          Logout
        </button>
      </form>
    </ul>
  );
}
