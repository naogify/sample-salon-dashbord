"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Store } from "lucide-react";
import { NAV_ITEMS, STORES, type StoreValue } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "ダッシュボード";
  const item = NAV_ITEMS.find(
    (nav) => nav.href !== "/" && pathname.startsWith(nav.href)
  );
  return item?.label ?? "";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const [store, setStore] = useState<StoreValue>("all");

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 pl-14 md:px-6">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <Select value={store} onValueChange={(v) => setStore(v as StoreValue)}>
          <SelectTrigger className="gap-2 text-sm text-muted-foreground border-border">
            <Store className="h-4 w-4 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {STORES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          YM
        </div>
      </div>
    </header>
  );
}
