import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        layout: { socialButtonsPlacement: "bottom" },
        elements: {
          formButtonPrimary: "bg-[#4a154b]",
        },
      }}
    />
  );
}
