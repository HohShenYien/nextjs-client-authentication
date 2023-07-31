import { NextPageWithProperties } from "@/pages/_app";
import useSession from "@/utils/useSession";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface RouteGuardProps {
  Component: NextPageWithProperties;
  pageProps: any;
}

const RouteGuard = ({ Component, pageProps }: RouteGuardProps) => {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated =
    Component.isPublic || session.status === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && session.status !== "loading") {
      router.push("/");
    }
  }, [Component, session.status]);

  if (session.status === "loading" && !Component.isPublic) {
    return "Loading...";
  }

  if (!isAuthenticated) {
    return "You are unauthenticated to view";
  }

  return <Component {...pageProps} />;
};

export default RouteGuard;
