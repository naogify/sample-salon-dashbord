export type Source = "hotpepper" | "line" | "google" | "phone" | "walkin";

export type Category =
  | "まつエク"
  | "まつげパーマ"
  | "ネイル"
  | "アイブロウ"
  | "セルフ脱毛"
  | "オプション"
  | "オフ";

export type TreatmentSpace = "まつエクベッド" | "ネイルデスク";

export type Staff = {
  id: string;
  name: string;
  role: "ネイリスト" | "アイリスト";
  employmentType: "正社員" | "業務委託";
  nominationFee: number;
  commissionRate?: number;
  color: string;
  displayOrder: number;
  status: "active" | "leave";
  leaveReason?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  duration: number;
};

export type Customer = {
  id: string;
  name: string;
  nameKana: string;
  phone: string;
  email?: string;
  source: Source;
  visitCount: number;
  lastVisit: string;
  birthDate?: string;
  gender?: string;
  allergy?: string;
  patchTestDate?: string;
  memo?: string;
};

export type Reservation = {
  id: string;
  customerId: string;
  staffId: string;
  menuItemIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  space: TreatmentSpace;
  source: Source;
  status: "confirmed" | "in_progress" | "completed";
  memo?: string;
};

export type Payment = {
  id: string;
  customerId: string;
  staffId: string;
  menuItemIds: string[];
  date: string;
  method: "cash" | "credit" | "qr";
  subtotal: number;
  discount: number;
  total: number;
  receiptNumber: string;
};

export type ChartRecord = {
  id: string;
  customerId: string;
  staffId: string;
  category: Category;
  date: string;
  designVariant: string;
  technicalDetails: string;
  glueType?: string;
  photos: string[];
  rating: number;
  staffNotes: string;
};
