import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

type SourceSale = {
  source: Source;
  count: number;
  amount: number;
  percentage: number;
  adCost: number;
  cpa: number;
};

export function SourceSales({ data }: { data: SourceSale[] }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-base font-bold mb-4">集客先別売上</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.source}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: SOURCE_COLORS[item.source] }}
                />
                <span className="text-sm font-medium">{SOURCE_LABELS[item.source]}</span>
                <span className="text-xs text-muted-foreground">
                  ({item.count}件)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  ¥{item.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {item.percentage}%
                </span>
                {item.cpa > 0 ? (
                  <span className="text-xs text-muted-foreground w-20 text-right">
                    CPA ¥{item.cpa.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground w-20 text-right">—</span>
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: SOURCE_COLORS[item.source],
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-sm font-bold">合計</span>
        <span className="text-sm font-bold">¥{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
