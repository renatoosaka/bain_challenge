import { Form } from "@/components/form";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-2xl font-bold leading-relaxed flex gap-2">
        Distance Calculation
      </h1>

      <Form />
    </main>
  );
}
