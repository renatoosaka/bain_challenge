"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ClockCounterClockwise, HouseSimple, MapTrifold } from "phosphor-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="shadow mb-4 sticky top-0 bg-sky-100">
      <div className="max-w-6xl w-full p-4 mx-auto bg-transparent flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <MapTrifold size={40} />
          <span className="md:text-lg font-bold leading-relaxed">
            Bain Delivery
          </span>
        </Link>
        <div className="flex gap-2 items-center">
          <Link
            className={clsx(
              "hover:text-white hover:bg-zinc-500 transition-all py-2 px-4 rounded-md text-xs flex justify-center items-center gap-1",
              {
                "bg-zinc-500 text-white": pathname === "/",
              }
            )}
            href="/"
          >
            <HouseSimple
              size={16}
              className={clsx({
                "text-white": pathname === "/",
              })}
            />
            Home
          </Link>
          <Link
            className={clsx(
              "hover:text-white hover:bg-zinc-500 transition-all py-2 px-4 rounded-md text-xs flex justify-center items-center gap-1",
              {
                "bg-zinc-500 text-white": pathname === "/history",
              }
            )}
            href="/history"
          >
            <ClockCounterClockwise
              size={16}
              className={clsx({
                "text-white": pathname === "/history",
              })}
            />
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
