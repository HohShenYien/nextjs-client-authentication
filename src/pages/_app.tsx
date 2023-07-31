import RouteGuard from "@/components/RouteGuard";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useState } from "react";

export type NextPageWithProperties<P = {}, IP = P> = NextPage<P, IP> & {
  isPublic?: boolean;
};

type AppPropsWithProperties = AppProps & {
  Component: NextPageWithProperties;
};

export default function App({ Component, pageProps }: AppPropsWithProperties) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard Component={Component} pageProps={pageProps} />
    </QueryClientProvider>
  );
}
