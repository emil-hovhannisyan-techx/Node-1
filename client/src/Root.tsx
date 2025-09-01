import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <>
      <nav>
        <Link to="/students">Students</Link> |{" "}
        <Link to="/classes">Classes</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
