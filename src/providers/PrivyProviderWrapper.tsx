"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "clq3x22e1000108l69a1949z5"}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#1863E1", // Primary Blue
          logo: "https://auth.privy.io/logos/privy-logo-dark.png", // Using Privy placeholder
          showWalletLoginFirst: false,
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}
