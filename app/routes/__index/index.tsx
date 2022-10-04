import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <div>Wellcome to Friday.com</div>
      <Link to="/dashboard">Access our application</Link>
    </div>
  );
}
