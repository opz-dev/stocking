export interface StockingItem {
  id: string;
  productName: string;
  productCode: string;
  color: string;
  size: string;
  quantity: number;
  originalQuantity?: number;
  price: number;
  imageUrl: string;
  janCode: string;
  deliveryDate?: Date;
  deliveryNumber?: string;
  isCompleted: boolean;
}

export interface StockingHistory {
  id: string;
  productName: string;
  productCode: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  janCode: string;
  imageUrl?: string;
  completedAt: Date;
  canRestore: boolean;
}

export const mockStockingItems: StockingItem[] = [
  {
    id: "1",
    productName: "ベーシックTシャツ",
    productCode: "BSC-T-WH-M",
    color: "白",
    size: "M",
    quantity: 15,
    price: 2980,
    imageUrl: "/100HS25D0011_l_c101.jpg",
    janCode: "4901234567890",
    isCompleted: false,
  },
  {
    id: "2",
    productName: "デニムジーンズ",
    productCode: "DNM-J-IND-30",
    color: "インディゴ",
    size: "L",
    quantity: 8,
    price: 8900,
    imageUrl: "/100PA25E0029_l_c106.jpg",
    janCode: "4901234567891",
    isCompleted: false,
  },
  {
    id: "3",
    productName: "ニットセーター",
    productCode: "KNT-SW-GY-L",
    color: "グレー",
    size: "L",
    quantity: 12,
    price: 5500,
    imageUrl: "/1006A25E0050_l_c103.jpg",
    janCode: "4901234567892",
    isCompleted: false,
  },
  {
    id: "4",
    productName: "チェックシャツ",
    productCode: "CHK-SH-RB-S",
    color: "ラテ",
    size: "S",
    quantity: 10,
    price: 4200,
    imageUrl: "/100HS25D0011_l_c101.jpg",
    janCode: "4901234567893",
    isCompleted: false,
  },
  {
    id: "5",
    productName: "スキニーパンツ",
    productCode: "SKN-PT-BK-28",
    color: "黒",
    size: "M",
    quantity: 20,
    price: 6800,
    imageUrl: "/100PA25E0029_l_c106.jpg",
    janCode: "4901234567894",
    isCompleted: false,
  },
  {
    id: "6",
    productName: "カーディガン",
    productCode: "CDG-BG-XL",
    color: "ベージュ",
    size: "XL",
    quantity: 6,
    price: 7300,
    imageUrl: "/1006A25E0050_l_c103.jpg",
    janCode: "4901234567895",
    isCompleted: false,
  },
  {
    id: "7",
    productName: "ワンピース",
    productCode: "OPC-FL-M",
    color: "花柄",
    size: "M",
    quantity: 14,
    price: 9500,
    imageUrl: "/100HS25D0011_l_c101.jpg",
    janCode: "4901234567896",
    isCompleted: false,
  },
  {
    id: "8",
    productName: "パーカー",
    productCode: "HDY-NV-L",
    color: "紺",
    size: "L",
    quantity: 18,
    price: 4800,
    imageUrl: "/100PA25E0029_l_c106.jpg",
    janCode: "4901234567897",
    isCompleted: false,
  },
  {
    id: "9",
    productName: "スカート プリーツ",
    productCode: "SKT-PL-BK-S",
    color: "黒",
    size: "S",
    quantity: 9,
    price: 5200,
    imageUrl: "/1006A25E0050_l_c103.jpg",
    janCode: "4901234567898",
    isCompleted: false,
  },
  {
    id: "10",
    productName: "ブレザー",
    productCode: "BLZ-GY-M",
    color: "グレー",
    size: "M",
    quantity: 4,
    price: 12800,
    imageUrl: "/100HS25D0011_l_c101.jpg",
    janCode: "4901234567899",
    isCompleted: false,
  },
];

export const mockStockingHistories: StockingHistory[] = [
  {
    id: "h1",
    productName: "ポロシャツ",
    productCode: "PLO-WH-L",
    color: "白",
    size: "L",
    quantity: 12,
    price: 3500,
    janCode: "4901234567801",
    imageUrl: "/100HS25D0011_l_c101.jpg",
    completedAt: new Date("2024-08-12T10:30:00"),
    canRestore: true,
  },
  {
    id: "h2",
    productName: "チノパン",
    productCode: "CHN-BG-32",
    color: "ベージュ",
    size: "32",
    quantity: 7,
    price: 5800,
    janCode: "4901234567802",
    imageUrl: "/100PA25E0029_l_c106.jpg",
    completedAt: new Date("2024-08-12T09:45:00"),
    canRestore: true,
  },
  {
    id: "h3",
    productName: "タンクトップ",
    productCode: "TNK-BK-S",
    color: "黒",
    size: "S",
    quantity: 22,
    price: 1980,
    janCode: "4901234567803",
    imageUrl: "/1006A25E0050_l_c103.jpg",
    completedAt: new Date("2024-08-12T08:20:00"),
    canRestore: true,
  },
  {
    id: "h4",
    productName: "ジャケット",
    productCode: "JKT-NV-M",
    color: "紺",
    size: "M",
    quantity: 5,
    price: 11500,
    janCode: "4901234567804",
    imageUrl: "/100HS25D0011_l_c101.jpg",
    completedAt: new Date("2024-08-11T16:10:00"),
    canRestore: false,
  },
  {
    id: "h5",
    productName: "ハーフパンツ",
    productCode: "HLF-KH-L",
    color: "カーキ",
    size: "L",
    quantity: 16,
    price: 3800,
    janCode: "4901234567805",
    imageUrl: "/100PA25E0029_l_c106.jpg",
    completedAt: new Date("2024-08-11T14:30:00"),
    canRestore: false,
  },
  {
    id: "h6",
    productName: "ブラウス",
    productCode: "BLS-WH-XS",
    color: "白",
    size: "XS",
    quantity: 8,
    price: 4500,
    janCode: "4901234567806",
    imageUrl: "/1006A25E0050_l_c103.jpg",
    completedAt: new Date("2024-08-11T11:15:00"),
    canRestore: false,
  },
];
