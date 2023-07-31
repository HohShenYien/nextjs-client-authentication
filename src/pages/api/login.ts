import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

type Data = {
  status: "success" | "failure";
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // You should also validate that it's a post request
  // Please don't use this in production, you should validate it at least
  const cred = JSON.parse(req.body) as { email: string; password: string };
  if (cred.email === "john@gmail.com" && cred.password === "secret") {
    setCookie("token", "ThisIsJohnToken", {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    res.status(200).json({ status: "success" });
  } else {
    res.status(403).json({ status: "failure" });
  }
}
