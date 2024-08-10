import { turso } from "@/services/database";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import flowArrow from "@/assets/flow-arrow.svg";
import Image from "next/image";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

type HistoryRow = {
  id: string;
  source: string;
  destination: string;
  distance: number;
  created_at: string;
};

export default async function Page() {
  const rs = await turso.execute(
    "SELECT * FROM history ORDER BY created_at DESC"
  );

  return (
    <main className="flex flex-col items-center justify-start max-w-6xl w-full h-full px-2 md:px-4">
      <h1 className="text-2xl font-bold leading-relaxed">History</h1>
      <section className="grid grid-cols-1 items-center mt-4 w-full gap-2 md:grid-cols-4">
        {rs.rows.map((row) => (
          <div
            key={row.id?.toString()}
            className="flex flex-col border border-zinc-300 rounded p-4 w-full gap-2"
          >
            <div className="font-semibold flex gap-1 text-sm items-center justify-between">
              {row.source?.toString()}
              <Image src={flowArrow} alt="flow arrow" width={16} height={16} />
              {row.destination?.toString()}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {Number(row.distance?.toString()).toFixed(2)} km
              </p>
              <small className="text-xs">
                {dayjs(row.created_at?.toString())
                  .utc(true)
                  .tz("America/Sao_Paulo")
                  .fromNow()}
              </small>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
