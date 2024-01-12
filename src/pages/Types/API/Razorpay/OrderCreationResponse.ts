export interface OrderCreationResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: null;
  status: string;
  attempts: number;
  notes: any[];
  created_at: number;
}
