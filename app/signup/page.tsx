import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
