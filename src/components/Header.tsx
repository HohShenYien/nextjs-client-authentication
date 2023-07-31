import { useLogoutMutation } from "@/queries/auth";
import Link from "next/link";

const Header = () => {
  const logoutMutation = useLogoutMutation();
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/protected">Protected Route</Link>
      <div className="spacer" />
      <a href="#" onClick={() => logoutMutation.mutate()}>
        Logout
      </a>
    </nav>
  );
};

export default Header;
