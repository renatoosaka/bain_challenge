import { useFormStatus } from "react-dom";
import { ArrowRight, Spinner } from "phosphor-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 rounded px-4 py-2 text-white font-semibold flex items-center justify-center gap-2"
      disabled={pending}
      tabIndex={3}
    >
      {pending ? "Calculating distance..." : "Calculate"}
      {pending ? (
        <Spinner size={20} className="animate-spin" />
      ) : (
        <ArrowRight size={20} />
      )}
    </button>
  );
}
