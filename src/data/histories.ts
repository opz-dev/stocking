import { StockingHistory } from './mock-data';
import { getMockStockingHistories } from './mock-data';

export async function getHistories(): Promise<StockingHistory[]> {
  // mockデータを返す
  return getMockStockingHistories();
}