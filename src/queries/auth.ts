import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type LoginCredentials = {
  email: string;
  password: string;
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["current-user"] });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await fetch("/api/logout");
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["current-user"] });
    },
  });
};

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await fetch("/api/me");
      if (response.ok) {
        const data = (await response.json()).user as {
          username: string;
          email: string;
        };
        return { status: "success", user: data };
      }
      return { status: "failure", user: null };
    },
  });
};
