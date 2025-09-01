import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import StudentsPage from "./StudentsPage";
import ClassesPage from "./ClassesPage";
import { loader as studentsLoader } from "./studentloader";
import { loader as classesLoader } from "./classloader";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "students",
        element: <StudentsPage />,
        loader: studentsLoader,
      },
      {
        path: "classes",
        element: <ClassesPage />,
        loader: classesLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
