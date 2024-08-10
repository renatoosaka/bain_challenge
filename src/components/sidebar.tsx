import { Form } from "./form";

export function Sidebar() {
  return (
    <aside className="w-80 h-full bg-zinc-900 p-4">
      <h1 className="text-2xl font-medium text-white text-center">
        Distance Calculation
      </h1>

      <Form />
    </aside>
  );
}
