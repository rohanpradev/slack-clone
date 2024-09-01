import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        layout: { socialButtonsPlacement: "bottom" },
        elements: {
          formButtonPrimary: "bg-[#4a154b]",
        },
      }}
    />
  );
}
