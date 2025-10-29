import type { Dispatch } from 'react';

export type Alignment = 'left' | 'center' | 'right';
export type InvoiceSection = 'addresses' | 'dates' | 'items' | 'summary' | 'notes';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}
export interface InvoiceData {
  logo: string | null;
  invoiceNumber: string;
  fromName: string;
  fromAddress: string;

  toName: string;
  toAddress: string;

  date: string;
  dueDate: string;
  
  items: InvoiceItem[];
  notes: string;
  footerText: string;
  taxRate: number;
}

export interface InvoiceSettings {
  accentColor: string;
  fontFamily: string;
  headerAlignment: Alignment;
  logoPosition: Alignment;
  headerFontSize: number;
  bodyFontSize: number;
  verticalSpacing: number;
  sectionOrder: InvoiceSection[];
}

export type Action =
  | { type: 'UPDATE_DATA'; payload: Partial<InvoiceData> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<InvoiceSettings> }
  | { type: 'ADD_ITEM'; payload: InvoiceItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<InvoiceItem> } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: InvoiceSection[] };

export interface InvoiceContextType {
  state: {
    data: InvoiceData;
    settings: InvoiceSettings;
  };
  dispatch: Dispatch<Action>;
}