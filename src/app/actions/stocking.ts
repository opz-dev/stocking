'use server';

import { StockingItem, StockingHistory } from '@/data/mock-data';
import { mockStockingItems, mockStockingHistories } from '@/data/mock-data';
import { revalidatePath } from 'next/cache';

let stockingItems = [...mockStockingItems];
let stockingHistories = [...mockStockingHistories];

export async function getStockingItems(): Promise<StockingItem[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return stockingItems.filter(item => !item.isCompleted);
}

export async function completeStockingItem(id: string): Promise<void> {
  const item = stockingItems.find(item => item.id === id);
  if (item) {
    item.isCompleted = true;
    
    const historyItem: StockingHistory = {
      id: `h-${Date.now()}`,
      productName: item.productName,
      productCode: item.productCode,
      quantity: item.quantity,
      price: item.price,
      janCode: item.janCode,
      completedAt: new Date(),
      canRestore: true,
    };
    
    stockingHistories.unshift(historyItem);
  }
  
  revalidatePath('/');
  revalidatePath('/histories');
}

export async function partialStockingItem(id: string, quantity: number): Promise<void> {
  const item = stockingItems.find(item => item.id === id);
  if (item && quantity > 0 && quantity <= item.quantity) {
    const historyItem: StockingHistory = {
      id: `h-${Date.now()}`,
      productName: item.productName,
      productCode: item.productCode,
      quantity: quantity,
      price: item.price,
      janCode: item.janCode,
      completedAt: new Date(),
      canRestore: true,
    };
    
    stockingHistories.unshift(historyItem);
    
    item.quantity -= quantity;
    
    if (item.quantity === 0) {
      item.isCompleted = true;
    }
  }
  
  revalidatePath('/');
  revalidatePath('/histories');
}

export async function completeMultipleStockingItems(ids: string[]): Promise<void> {
  const now = new Date();
  
  ids.forEach(id => {
    const item = stockingItems.find(item => item.id === id);
    if (item) {
      item.isCompleted = true;
      
      const historyItem: StockingHistory = {
        id: `h-${Date.now()}-${item.id}`,
        productName: item.productName,
        productCode: item.productCode,
        quantity: item.quantity,
        price: item.price,
        janCode: item.janCode,
        completedAt: now,
        canRestore: true,
      };
      
      stockingHistories.unshift(historyItem);
    }
  });
  
  revalidatePath('/');
  revalidatePath('/histories');
}

export async function getStockingHistories(filter?: {
  startDate?: Date;
  endDate?: Date;
  productName?: string;
}): Promise<StockingHistory[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filtered = [...stockingHistories];
  
  if (filter?.startDate) {
    filtered = filtered.filter(item => 
      new Date(item.completedAt) >= filter.startDate!
    );
  }
  
  if (filter?.endDate) {
    filtered = filtered.filter(item => 
      new Date(item.completedAt) <= filter.endDate!
    );
  }
  
  if (filter?.productName) {
    const searchTerm = filter.productName.toLowerCase();
    filtered = filtered.filter(item => 
      item.productName.toLowerCase().includes(searchTerm)
    );
  }
  
  return filtered;
}

export async function restoreStockingItem(historyId: string, quantity: number): Promise<void> {
  const historyItem = stockingHistories.find(item => item.id === historyId);
  
  if (historyItem) {
    const newItem: StockingItem = {
      id: `s-${Date.now()}`,
      productName: historyItem.productName,
      productCode: historyItem.productCode,
      quantity: quantity,
      originalQuantity: historyItem.quantity,
      price: historyItem.price,
      janCode: historyItem.janCode,
      deliveryDate: new Date(),
      deliveryNumber: `DN-${Date.now()}`,
      isCompleted: false,
    };
    
    stockingItems.push(newItem);
    historyItem.canRestore = false;
  }
  
  revalidatePath('/');
  revalidatePath('/histories');
}

export async function deleteStockingHistory(historyId: string): Promise<void> {
  stockingHistories = stockingHistories.filter(item => item.id !== historyId);
  revalidatePath('/histories');
}

export async function cancelStockingHistory(historyId: string): Promise<void> {
  const historyItem = stockingHistories.find(item => item.id === historyId);
  
  if (historyItem) {
    const existingItem = stockingItems.find(item => 
      item.productCode === historyItem.productCode && 
      !item.isCompleted
    );
    
    if (existingItem) {
      existingItem.quantity += historyItem.quantity;
    } else {
      const newItem: StockingItem = {
        id: `s-${Date.now()}`,
        productName: historyItem.productName,
        productCode: historyItem.productCode,
        quantity: historyItem.quantity,
        originalQuantity: historyItem.quantity,
        price: historyItem.price,
        janCode: historyItem.janCode,
        color: historyItem.color,
        size: historyItem.size,
        imageUrl: historyItem.imageUrl,
        deliveryDate: new Date(),
        deliveryNumber: `DN-${Date.now()}`,
        isCompleted: false,
      };
      
      stockingItems.push(newItem);
    }
    
    stockingHistories = stockingHistories.filter(item => item.id !== historyId);
  }
  
  revalidatePath('/');
  revalidatePath('/histories');
}