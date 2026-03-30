"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PERIODS = ["今日", "今週", "今月", "カスタム"] as const;

export function PeriodTabs() {
  const [active, setActive] = useState<string>("今日");

  const today = new Date();
  const dateLabel = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {PERIODS.map((period) => (
          <button
            key={period}
            onClick={() => setActive(period)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              active === period
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {period}
          </button>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">{dateLabel}</span>
    </div>
  );
}
