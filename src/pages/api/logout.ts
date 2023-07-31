import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

type Data = {
  status: "success" | "failure";
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  setCookie("token", "ThisIsJohnToken", {
    req,
    res,
    httpOnly: true,
    maxAge: -1,
  });
  res.status(200).json({ status: "success" });
}
