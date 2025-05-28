export type User = {
  id: string;
  username: string;
  name: string;
  role: string;
  permissions: string[];
  created_at: string;
};

export type TimeFrame = 'weekly' | 'yearly';

export type KPI = {
  id: string;
  name: string;
  value: number;
  target: number;
  change_percentage: number;
  time_frame: TimeFrame;
  created_at: string;
};

export type Complaint = {
  id: string;
  ticket_number: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  customer: string;
  project: string;
  unit_number: string;
  complaint_source: string;
  status: 'resolved' | 'pending' | 'cancelled';
  request_number: string;
  complaint_description: string;
  maintenance_action: string;
  action_taken: string;
  complaint_duration: string;
  expected_resolution_time: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
};

export type Delivery = {
  id: string;
  reservation_id: string;
  customer_name: string;
  customer_number: string;
  project: string;
  building: string;
  unit: string;
  payment_method: string;
  is_offplan: boolean;
  unit_value: number;
  transfer_date: string;
  sales_employee: string;
  construction_end_date: string;
  final_receipt_date: string;
  electricity_transfer_date: string;
  water_transfer_date: string;
  customer_delivery_date: string;
  notes: string;
  is_evaluated: boolean;
  evaluation_percentage: number;
  status: 'incomplete' | 'waiting_projects' | 'waiting_customer_satisfaction' | 'complete';
  created_at: string;
  updated_at: string;
};

export type CustomerService = {
  id: string;
  calls: number;
  complaints: number;
  contact_requests: number;
  maintenance_requests: number;
  inquiries: number;
  office_interests: number;
  project_interests: number;
  customer_interests: number;
  total: number;
  time_frame: TimeFrame;
  created_at: string;
};

export type Inquiries = {
  id: string;
  general_inquiries: number;
  document_requests: number;
  deed_inquiries: number;
  apartment_rentals: number;
  sold_projects: number;
  total: number;
  time_frame: TimeFrame;
  created_at: string;
};

export type MaintenanceStatus = {
  id: string;
  cancelled: number;
  resolved: number;
  in_progress: number;
  total: number;
  time_frame: TimeFrame;
  created_at: string;
};

export type CustomerSatisfaction = {
  id: string;
  service_satisfaction: number;
  first_time_resolution: number;
  resolution_time_satisfaction: number;
  customer_notes: string[];
  time_frame: TimeFrame;
  created_at: string;
};