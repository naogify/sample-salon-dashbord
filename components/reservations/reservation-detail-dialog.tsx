"use client";

import { X, Clock, MapPin, User, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SOURCE_COLORS, SOURCE_LABELS, CATEGORY_COLORS, RESERVATION_STATUS_LABELS } from "@/lib/constants";
import type { Reservation, Customer, Staff, MenuItem } from "@/lib/types";

export function ReservationDetailDialog({
  reservation, customer, staff, menuItems, onClose,
}: {
  reservation: Reservation | null;
  customer: Customer | undefined;
  staff: Staff | undefined;
  menuItems: MenuItem[];
  onClose: () => void;
}) {
  if (!reservation) return null;

  const selectedMenus = reservation.menuItemIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is MenuItem => m != null);

  const totalPrice = selectedMenus.reduce((sum, m) => sum + m.price, 0);
  const totalDuration = selectedMenus.reduce((sum, m) => sum + m.duration, 0);

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    confirmed: "bg-gray-100 text-gray-600",
  };

  const groupedMenus = selectedMenus.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-[400px] bg-card h-full overflow-y-auto shadow-xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">予約詳細</h2>
            <Badge className={cn("text-xs px-2 py-0.5", statusColors[reservation.status])}>
              {RESERVATION_STATUS_LABELS[reservation.status]}
            </Badge>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-5 flex-1">
          {/* Time & Space */}
          <section className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium">{reservation.startTime} – {reservation.endTime}</span>
              <span className="text-muted-foreground">({totalDuration}分)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <span>{reservation.space}</span>
            </div>
          </section>

          {/* Source */}
          <section>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: SOURCE_COLORS[reservation.source] }} />
              <span className="text-muted-foreground">流入元:</span>
              <span className="font-medium">{SOURCE_LABELS[reservation.source]}</span>
            </div>
          </section>

          {/* Customer */}
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">顧客</h3>
            {customer ? (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-sm">{customer.name}</div>
                  <div className="text-xs text-muted-foreground">{customer.nameKana}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{customer.phone}</div>
                  <div className="text-xs text-muted-foreground">来店 {customer.visitCount}回</div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">不明</p>
            )}
          </section>

          {/* Staff */}
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">担当スタッフ</h3>
            {staff ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <Scissors className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <div className="font-medium text-sm">{staff.name}</div>
                  <div className="text-xs text-muted-foreground">{staff.role}</div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">不明</p>
            )}
          </section>

          {/* Menu Items */}
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">メニュー</h3>
            <div className="space-y-3">
              {Object.entries(groupedMenus).map(([category, items]) => (
                <div key={category}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] }} />
                    <span className="text-xs text-muted-foreground font-medium">{category}</span>
                  </div>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg bg-muted/50 border border-border mb-1">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.duration}分</span>
                        <span className="text-foreground font-medium">¥{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Memo */}
          {reservation.memo && (
            <section>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">メモ</h3>
              <p className="text-sm p-3 rounded-lg bg-muted/50 border border-border whitespace-pre-wrap">{reservation.memo}</p>
            </section>
          )}
        </div>

        {/* Footer: total */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">合計</span>
            <span className="text-lg font-bold">¥{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
