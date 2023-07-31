import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";

type Data = {
  user?: {
    username: string;
    email: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = getCookie("token", { req, res });
  if (token === "ThisIsJohnToken") {
    res
      .status(200)
      .json({ user: { username: "John", email: "john@gmail.com" } });
  } else {
    res.status(403).json({});
  }
}
