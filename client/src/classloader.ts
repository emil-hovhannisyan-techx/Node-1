import axios from "axios";

export async function loader() {
  const res = await axios.get("/classes");
  return res.data;
}
