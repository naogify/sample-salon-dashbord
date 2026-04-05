"use client";

import { Button } from "@/components/ui/button";
import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

type SourceFilterProps = {
  selected: Source | null;
  onChange: (source: Source | null) => void;
};

const sources: Source[] = ["hotpepper", "line", "google", "phone", "walkin"];

export function SourceFilter({ selected, onChange }: SourceFilterProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      <Button
        variant={selected === null ? "default" : "ghost"}
        size="sm"
        className={
          selected === null
            ? "shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }
        onClick={() => onChange(null)}
      >
        すべて
      </Button>
      {sources.map((source) => (
        <Button
          key={source}
          variant={selected === source ? "default" : "ghost"}
          size="sm"
          className={
            selected === source
              ? "shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }
          onClick={() => onChange(selected === source ? null : source)}
        >
          <span
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: SOURCE_COLORS[source] }}
          />
          {SOURCE_LABELS[source]}
        </Button>
      ))}
    </div>
  );
}
