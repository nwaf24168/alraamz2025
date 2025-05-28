/*
  # Seed initial data for Alramz Real Estate Customer Satisfaction Platform

  1. Initial Data
     - Default admin user
     - Sample KPIs (weekly and yearly)
     - Sample complaints
     - Sample deliveries
     - Sample customer service data
     - Sample customer satisfaction data
*/

-- Add default admin user
INSERT INTO users (username, name, role, permissions)
VALUES ('nawaf', 'نواف', 'admin', ARRAY['dashboard', 'data_entry', 'complaints', 'delivery', 'analytics', 'settings'])
ON CONFLICT (username) DO NOTHING;

-- Add sample KPIs for weekly view
INSERT INTO kpis (name, value, target, change_percentage, time_frame)
VALUES 
  ('نسبة الترشيح للعملاء الجدد', 68, 65, 4.6, 'weekly'),
  ('نسبة الترشيح بعد السنة', 70, 65, 7.7, 'weekly'),
  ('نسبة الترشيح للعملاء القدامى', 35, 30, 16.7, 'weekly'),
  ('جودة التسليم', 99, 100, 2.5, 'weekly'),
  ('جودة الصيانة', 98, 100, 3.8, 'weekly'),
  ('عدد الثواني للرد', 2.5, 3, 16.7, 'weekly'),
  ('معدل الرد على المكالمات', 16, 80, 20.0, 'weekly'),
  ('راحة العميل (CSAT)', 78, 70, 11.4, 'weekly'),
  ('سرعة إغلاق طلبات الصيانة', 2.2, 3, 26.7, 'weekly'),
  ('عدد إعادة فتح طلب', 2, 0, 200.0, 'weekly'),
  ('جودة إدارة المرافق', 85, 80, 6.3, 'weekly'),
  ('معدل التحول', 2.5, 2, 25.0, 'weekly'),
  ('نسبة الرضا عن التسليم', 85, 80, 6.3, 'weekly'),
  ('عدد العملاء المرشحين', 583, 584, 91.7, 'weekly'),
  ('المساهمة في المبيعات', 7, 5, 40.0, 'weekly');

-- Add sample KPIs for yearly view
INSERT INTO kpis (name, value, target, change_percentage, time_frame)
VALUES 
  ('نسبة الترشيح للعملاء الجدد', 66, 65, 1.5, 'yearly'),
  ('نسبة الترشيح بعد السنة', 67, 65, 3.1, 'yearly'),
  ('نسبة الترشيح للعملاء القدامى', 32, 30, 6.7, 'yearly'),
  ('جودة التسليم', 97, 100, -3.0, 'yearly'),
  ('جودة الصيانة', 95, 100, -5.0, 'yearly'),
  ('عدد الثواني للرد', 3.2, 3, 6.7, 'yearly'),
  ('معدل الرد على المكالمات', 75, 80, -6.3, 'yearly'),
  ('راحة العميل (CSAT)', 72, 70, 2.9, 'yearly'),
  ('سرعة إغلاق طلبات الصيانة', 3.5, 3, 16.7, 'yearly'),
  ('عدد إعادة فتح طلب', 1, 0, 100.0, 'yearly'),
  ('جودة إدارة المرافق', 82, 80, 2.5, 'yearly'),
  ('معدل التحول', 1.8, 2, -10.0, 'yearly'),
  ('نسبة الرضا عن التسليم', 81, 80, 1.3, 'yearly'),
  ('عدد العملاء المرشحين', 7004, 7004, 0.0, 'yearly'),
  ('المساهمة في المبيعات', 4.8, 5, -4.0, 'yearly');

-- Add sample complaints
INSERT INTO complaints (ticket_number, priority, date, customer, project, unit_number, complaint_source, status, request_number, complaint_description, maintenance_action, action_taken, complaint_duration, expected_resolution_time, updated_by)
VALUES 
  ('TCKT-123456', 'high', '2025-01-15', 'أحمد الشمري', 'الشمالي', 'A-42', 'هاتف', 'pending', 'REQ-7890', 'تسرب مياه في الحمام الرئيسي', 'تم إرسال فريق الصيانة', 'تم إصلاح التسرب واستبدال الأنابيب التالفة', '3 أيام', '2025-01-18', 'nawaf'),
  ('TCKT-123457', 'medium', '2025-01-14', 'سارة العتيبي', 'الشرقي', 'B-18', 'زيارة', 'resolved', 'REQ-7891', 'مشكلة في نظام التكييف', 'فحص وإصلاح وحدة التكييف', 'تم تنظيف الفلاتر واستبدال قطع الغيار المعطوبة', '2 أيام', '2025-01-16', 'nawaf'),
  ('TCKT-123458', 'low', '2025-01-13', 'محمد القحطاني', 'الغربي', 'C-7', 'بريد إلكتروني', 'cancelled', 'REQ-7892', 'ضعف في إشارة الإنترنت', 'تواصل مع مزود خدمة الإنترنت', 'تم إلغاء الطلب بناءً على طلب العميل', '1 يوم', '2025-01-14', 'nawaf');

-- Add sample deliveries
INSERT INTO deliveries (reservation_id, customer_name, customer_number, project, building, unit, payment_method, is_offplan, unit_value, transfer_date, sales_employee, construction_end_date, final_receipt_date, electricity_transfer_date, water_transfer_date, customer_delivery_date, notes, is_evaluated, evaluation_percentage, status)
VALUES 
  ('1', 'تركي السعيد', '05xxxxxxxx', 'الشمالي', 'A', '26', 'نقدي', false, 750000, '2024-12-17', 'فهد الحربي', '2024-11-30', '2024-12-10', '2024-12-12', '2024-12-13', '2024-12-20', 'تم التسليم بنجاح', true, 95, 'complete'),
  ('4', 'تركي السماري', '05xxxxxxxx', 'الشمالي', 'A', '42', 'تمويل بنكي', true, 850000, '2024-12-25', 'سعد العتيبي', '2024-12-15', '2024-12-20', '2024-12-22', '2024-12-23', null, null, false, 0, 'waiting_customer_satisfaction'),
  ('5', 'علي بخاري', '05xxxxxxxx', 'زهرة 45', 'B', '3', 'نقدي', true, 620000, '2024-12-01', 'خالد الزهراني', null, null, null, null, null, 'في مرحلة البناء', false, 0, 'waiting_projects'),
  ('6', 'ياسين العلي', '05xxxxxxxx', 'زهرة 45', 'C', '14', 'تمويل بنكي', true, 580000, '2024-12-18', 'محمد السالم', null, null, null, null, null, 'في مرحلة البناء', false, 0, 'waiting_projects');

-- Add sample customer service data
INSERT INTO customer_service (calls, complaints, contact_requests, maintenance_requests, inquiries, office_interests, project_interests, customer_interests, total, time_frame)
VALUES 
  (307, 28, 42, 65, 58, 34, 38, 42, 307, 'weekly'),
  (3619, 348, 512, 723, 634, 412, 456, 534, 3619, 'yearly');

-- Add sample inquiries
INSERT INTO inquiries (general_inquiries, document_requests, deed_inquiries, apartment_rentals, sold_projects, total, time_frame)
VALUES 
  (20, 10, 8, 12, 8, 58, 'weekly'),
  (210, 145, 98, 132, 112, 697, 'yearly');

-- Add sample maintenance status
INSERT INTO maintenance_status (cancelled, resolved, in_progress, total, time_frame)
VALUES 
  (1, 0, 9, 10, 'weekly'),
  (12, 87, 24, 123, 'yearly');

-- Add sample customer satisfaction
INSERT INTO customer_satisfaction (service_satisfaction, first_time_resolution, resolution_time_satisfaction, customer_notes, time_frame)
VALUES 
  (87.4, 62.4, 80.9, '[{"customer": "عبدالله الحربي", "text": "خدمة ممتازة وسريعة", "time": "12:30 PM"}, {"customer": "سارة العتيبي", "text": "تأخر في معالجة المشكلة", "time": "09:15 AM"}, {"customer": "محمد القحطاني", "text": "فريق محترف جدًا", "time": "02:45 PM"}]', 'weekly'),
  (84.2, 58.7, 76.3, '[{"customer": "فهد السهلي", "text": "راضي عن مستوى الخدمة بشكل عام", "time": "11:20 AM"}, {"customer": "نورة الدوسري", "text": "أتمنى تحسين سرعة الاستجابة", "time": "10:05 AM"}, {"customer": "سلطان العنزي", "text": "تجربة إيجابية مع فريق الصيانة", "time": "03:30 PM"}]', 'yearly');