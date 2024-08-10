"use client";

import { calculateDistance } from "@/actions/calculate-distance";
import { useRef, useState } from "react";
import { SubmitButton } from "./submit-button";

type State = {
  error: null | string;
  distance: number;
};

export function Form() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<State>({ error: null, distance: 0 });

  const handleformAction = async (formData: FormData) => {
    ref.current?.reset();

    const { distance, error } = await calculateDistance(formData);

    setState({ error, distance });
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 my-16 w-80"
        action={handleformAction}
      >
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded"
          placeholder="Source address"
          name="source"
          tabIndex={1}
          required
          autoFocus
        />
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded"
          placeholder="Destination address"
          name="destination"
          tabIndex={2}
          required
        />

        <SubmitButton />
      </form>

      <section className="flex flex-col gap-4">
        {state.error && <p className="text-red-500">{state.error}</p>}

        {state.distance > 0 && <p>Distance: {state.distance.toFixed(2)} KM</p>}
      </section>
    </>
  );
}
