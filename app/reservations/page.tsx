"use client";

import { useState } from "react";
import { DayNavigator } from "@/components/reservations/day-navigator";
import { SourceLegend } from "@/components/reservations/source-legend";
import { TimelineGrid } from "@/components/reservations/timeline-grid";
import { NewReservationDialog } from "@/components/reservations/new-reservation-dialog";
import { ReservationDetailDialog } from "@/components/reservations/reservation-detail-dialog";
import { staffList, reservations, customers, menuItems } from "@/lib/mock-data";
import type { Reservation } from "@/lib/types";

export default function ReservationsPage() {
  const [date, setDate] = useState(new Date(2026, 2, 30));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  return (
    <div>
      <DayNavigator date={date} onDateChange={setDate} onNewReservation={() => setDialogOpen(true)} />
      <SourceLegend />
      <TimelineGrid
        staffList={staffList} reservations={reservations} customers={customers} menuItems={menuItems}
        onReservationClick={setSelectedReservation}
      />
      <NewReservationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} customers={customers} staffList={staffList} menuItems={menuItems} />
      <ReservationDetailDialog
        reservation={selectedReservation}
        customer={customers.find((c) => c.id === selectedReservation?.customerId)}
        staff={staffList.find((s) => s.id === selectedReservation?.staffId)}
        menuItems={menuItems}
        onClose={() => setSelectedReservation(null)}
      />
    </div>
  );
}
