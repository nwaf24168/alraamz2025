/*
  # Initial database schema for Alramz Real Estate Customer Satisfaction Platform

  1. New Tables
     - `users` - Staff members with access to the platform
     - `kpis` - Key performance indicators for dashboard
     - `complaints` - Customer complaints and issues
     - `deliveries` - Property delivery tracking
     - `customer_service` - Customer service statistics
     - `inquiries` - Customer inquiries types and counts
     - `maintenance_status` - Maintenance request status tracking
     - `customer_satisfaction` - Customer satisfaction metrics

  2. Security
     - Enable RLS on all tables
     - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  permissions text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create KPIs table
CREATE TABLE IF NOT EXISTS kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric NOT NULL,
  target numeric NOT NULL,
  change_percentage numeric NOT NULL,
  time_frame text NOT NULL CHECK (time_frame IN ('weekly', 'yearly')),
  created_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  date date NOT NULL,
  customer text NOT NULL,
  project text NOT NULL,
  unit_number text NOT NULL,
  complaint_source text NOT NULL,
  status text NOT NULL CHECK (status IN ('resolved', 'pending', 'cancelled')),
  request_number text,
  complaint_description text NOT NULL,
  maintenance_action text,
  action_taken text,
  complaint_duration text,
  expected_resolution_time date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by text
);

-- Create deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_number text NOT NULL,
  project text NOT NULL,
  building text NOT NULL,
  unit text NOT NULL,
  payment_method text NOT NULL,
  is_offplan boolean NOT NULL DEFAULT false,
  unit_value numeric NOT NULL,
  transfer_date date NOT NULL,
  sales_employee text NOT NULL,
  construction_end_date date,
  final_receipt_date date,
  electricity_transfer_date date,
  water_transfer_date date,
  customer_delivery_date date,
  notes text,
  is_evaluated boolean DEFAULT false,
  evaluation_percentage numeric DEFAULT 0,
  status text NOT NULL CHECK (status IN ('incomplete', 'waiting_projects', 'waiting_customer_satisfaction', 'complete')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create customer service table
CREATE TABLE IF NOT EXISTS customer_service (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  calls numeric NOT NULL,
  complaints numeric NOT NULL,
  contact_requests numeric NOT NULL,
  maintenance_requests numeric NOT NULL,
  inquiries numeric NOT NULL,
  office_interests numeric NOT NULL,
  project_interests numeric NOT NULL,
  customer_interests numeric NOT NULL,
  total numeric NOT NULL,
  time_frame text NOT NULL CHECK (time_frame IN ('weekly', 'yearly')),
  created_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  general_inquiries numeric NOT NULL,
  document_requests numeric NOT NULL,
  deed_inquiries numeric NOT NULL,
  apartment_rentals numeric NOT NULL,
  sold_projects numeric NOT NULL,
  total numeric NOT NULL,
  time_frame text NOT NULL CHECK (time_frame IN ('weekly', 'yearly')),
  created_at timestamptz DEFAULT now()
);

-- Create maintenance status table
CREATE TABLE IF NOT EXISTS maintenance_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cancelled numeric NOT NULL,
  resolved numeric NOT NULL,
  in_progress numeric NOT NULL,
  total numeric NOT NULL,
  time_frame text NOT NULL CHECK (time_frame IN ('weekly', 'yearly')),
  created_at timestamptz DEFAULT now()
);

-- Create customer satisfaction table
CREATE TABLE IF NOT EXISTS customer_satisfaction (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_satisfaction numeric NOT NULL,
  first_time_resolution numeric NOT NULL,
  resolution_time_satisfaction numeric NOT NULL,
  customer_notes jsonb DEFAULT '[]'::jsonb,
  time_frame text NOT NULL CHECK (time_frame IN ('weekly', 'yearly')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_satisfaction ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (role = 'admin');

CREATE POLICY "Admin can update users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (role = 'admin');

CREATE POLICY "Admin can delete users"
  ON users
  FOR DELETE
  TO authenticated
  USING (role = 'admin');

-- KPIs policies
CREATE POLICY "Authenticated users can read KPIs"
  ON kpis
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert KPIs"
  ON kpis
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update KPIs"
  ON kpis
  FOR UPDATE
  TO authenticated
  USING (true);

-- Complaints policies
CREATE POLICY "Authenticated users can read complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete complaints"
  ON complaints
  FOR DELETE
  TO authenticated
  USING (true);

-- Deliveries policies
CREATE POLICY "Authenticated users can read deliveries"
  ON deliveries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert deliveries"
  ON deliveries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update deliveries"
  ON deliveries
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete deliveries"
  ON deliveries
  FOR DELETE
  TO authenticated
  USING (true);

-- Customer service policies
CREATE POLICY "Authenticated users can read customer service"
  ON customer_service
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customer service"
  ON customer_service
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customer service"
  ON customer_service
  FOR UPDATE
  TO authenticated
  USING (true);

-- Similar policies for other tables
CREATE POLICY "Authenticated users can read inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert inquiries"
  ON inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read maintenance status"
  ON maintenance_status
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert maintenance status"
  ON maintenance_status
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update maintenance status"
  ON maintenance_status
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read customer satisfaction"
  ON customer_satisfaction
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customer satisfaction"
  ON customer_satisfaction
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customer satisfaction"
  ON customer_satisfaction
  FOR UPDATE
  TO authenticated
  USING (true);