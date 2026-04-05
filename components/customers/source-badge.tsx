import { SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

const SOURCE_BADGE_STYLES: Record<Source, string> = {
  hotpepper:
    "bg-orange-50 text-orange-600 ring-orange-200/60",
  line: "bg-emerald-50 text-emerald-600 ring-emerald-200/60",
  google: "bg-blue-50 text-blue-600 ring-blue-200/60",
  phone: "bg-gray-50 text-gray-600 ring-gray-200/60",
  walkin: "bg-pink-50 text-pink-600 ring-pink-200/60",
};

const SOURCE_DOT_COLORS: Record<Source, string> = {
  hotpepper: "bg-orange-400",
  line: "bg-emerald-400",
  google: "bg-blue-400",
  phone: "bg-gray-400",
  walkin: "bg-pink-400",
};

export function SourceBadge({
  source,
  size = "sm",
}: {
  source: Source;
  size?: "sm" | "lg";
}) {
  const textSize = size === "lg" ? "text-xs" : "text-[11px]";
  const padding = size === "lg" ? "px-2.5 py-1" : "px-2 py-0.5";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ring-1 font-medium ${textSize} ${padding} ${SOURCE_BADGE_STYLES[source]}`}
    >
      <span
        className={`size-1.5 rounded-full ${SOURCE_DOT_COLORS[source]}`}
      />
      {SOURCE_LABELS[source]}
    </span>
  );
}
