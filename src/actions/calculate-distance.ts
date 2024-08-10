"use server";

import { turso } from "@/services/database";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

const EARTH_RADIUS_KILOMETERS = 6371;

const fetchAddressLocation = async (address: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?addressdetails=0&q=${encodeURIComponent(
      address
    )}&format=jsonv2&limit=1`
  );

  const [data] = await response.json();

  return data;
};

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRadians = (angle: number) => angle * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_KILOMETERS * c;
  return distance;
};

export const calculateDistance = async (formData: FormData) => {
  try {
    const source = formData.get("source") as string;
    const destination = formData.get("destination") as string;

    const [sourceLocation, destinationLocation] = await Promise.all([
      fetchAddressLocation(source),
      fetchAddressLocation(destination),
    ]);

    const distance = haversineDistance(
      sourceLocation.lat,
      sourceLocation.lon,
      destinationLocation.lat,
      destinationLocation.lon
    );

    await turso.execute({
      sql: "INSERT INTO history (id, source, destination, distance) VALUES (?, ?, ?, ?)",
      args: [randomUUID(), source, destination, distance],
    });

    revalidatePath("/history");

    return {
      distance,
      error: null,
    };
  } catch (e) {
    console.error(`[ERROR] ${e}`);

    return {
      error: "Something went wrong",
      distance: 0,
    };
  }
};
