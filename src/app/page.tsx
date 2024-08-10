import { Form } from "@/components/form";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-relaxed flex gap-2 flex-col">
          Distance Calculation
        </h1>
        <small className="text-sm ">
          All distances are calculated in kilometers using the{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Haversine_formula"
            target="_blank"
            className="text-blue-500"
          >
            Haversine formula
          </Link>
        </small>
      </div>

      <Form />
    </main>
  );
}
