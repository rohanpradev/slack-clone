import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="mt-52 flex h-full w-full flex-col items-center justify-center">{children}</div>;
};

export default AuthLayout;
