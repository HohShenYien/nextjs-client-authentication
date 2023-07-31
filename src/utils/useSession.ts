import { useGetCurrentUserQuery } from "@/queries/auth";
import { useMemo } from "react";

type Session =
  | {
      status: "loading" | "unauthenticated";
      user: undefined;
    }
  | {
      status: "authenticated";
      user: { username: string; email: string };
    };

const useSession = () => {
  const { data, isError, isSuccess, isLoading } = useGetCurrentUserQuery();

  const session: Session = useMemo(() => {
    if (isSuccess && data.status === "success") {
      return {
        status: "authenticated",
        user: data.user as { username: string; email: string },
      };
    }
    if (isError) {
      return { status: "unauthenticated", user: undefined };
    }
    if (isLoading) {
      return { status: "loading", user: undefined };
    }
    return { status: "unauthenticated", user: undefined };
  }, [data, isError, isSuccess]);

  return session;
};

export default useSession;
