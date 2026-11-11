import { MyButton } from "@/components/ui/MyButton";
import { MyHeading } from "@/components/ui/MyHeading";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5">
      <MyHeading as="h1" eyebrow="404" className="text-[40px]">
        This page is not in the workspace.
      </MyHeading>
      <p className="mt-4">
        The route does not match a lane, an agent desk, or the command centre.
      </p>
      <div className="mt-8">
        <MyButton href="/command-centre" variant="primary">
          Back to command centre
        </MyButton>
      </div>
    </main>
  );
}
