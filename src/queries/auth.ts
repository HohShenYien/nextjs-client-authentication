import { useMutation, useQuery } from "@tanstack/react-query";

type LoginCredentials = {
  email: string;
  password: string;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        if (!res.ok) {
          throw new Error();
        }
        return { message: "Successful" };
      } catch (ex) {
        throw new Error("Something went wrong");
      }
    },
  });
};

export const useUserDataQuery = () => {};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await fetch("/api/logout");
    },
  });
};

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await fetch("/api/me");
      if (response.ok) {
        return (await response.json()).user as {
          username: string;
          email: string;
        };
      }
      throw Error("Unauthenticated");
    },
  });
};
