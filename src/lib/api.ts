import { supabase } from './supabase';
import { TimeFrame, KPI, Complaint, Delivery } from '../types';

// KPIs
export async function getKPIs(timeFrame: TimeFrame) {
  try {
    const { data, error } = await supabase
      .from('kpis')
      .select('*')
      .eq('time_frame', timeFrame)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as KPI[];
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    throw error;
  }
}

export async function addKPI(kpi: Omit<KPI, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('kpis')
      .insert([{ ...kpi, created_at: new Date().toISOString() }])
      .select();

    if (error) throw error;
    return data[0] as KPI;
  } catch (error) {
    console.error('Error adding KPI:', error);
    throw error;
  }
}

// Complaints
export async function getComplaints() {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Complaint[];
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
}

export async function addComplaint(complaint: Omit<Complaint, 'id' | 'created_at' | 'updated_at' | 'updated_by'>) {
  try {
    const timestamp = new Date().toISOString();
    const { data, error } = await supabase
      .from('complaints')
      .insert([{ 
        ...complaint, 
        created_at: timestamp,
        updated_at: timestamp,
        ticket_number: `TCKT-${Math.floor(100000 + Math.random() * 900000)}`
      }])
      .select();

    if (error) throw error;
    return data[0] as Complaint;
  } catch (error) {
    console.error('Error adding complaint:', error);
    throw error;
  }
}

export async function updateComplaint(id: string, updates: Partial<Complaint>, updatedBy: string) {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString(),
        updated_by: updatedBy
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0] as Complaint;
  } catch (error) {
    console.error('Error updating complaint:', error);
    throw error;
  }
}

export async function deleteComplaint(id: string) {
  try {
    const { error } = await supabase
      .from('complaints')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting complaint:', error);
    throw error;
  }
}

// Deliveries
export async function getDeliveries() {
  try {
    const { data, error } = await supabase
      .from('deliveries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Delivery[];
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    throw error;
  }
}

export async function addDelivery(delivery: Omit<Delivery, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const timestamp = new Date().toISOString();
    const { data, error } = await supabase
      .from('deliveries')
      .insert([{ 
        ...delivery, 
        created_at: timestamp,
        updated_at: timestamp
      }])
      .select();

    if (error) throw error;
    return data[0] as Delivery;
  } catch (error) {
    console.error('Error adding delivery:', error);
    throw error;
  }
}

export async function updateDelivery(id: string, updates: Partial<Delivery>) {
  try {
    const { data, error } = await supabase
      .from('deliveries')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0] as Delivery;
  } catch (error) {
    console.error('Error updating delivery:', error);
    throw error;
  }
}

// Customer Service
export async function getCustomerService(timeFrame: TimeFrame) {
  try {
    const { data, error } = await supabase
      .from('customer_service')
      .select('*')
      .eq('time_frame', timeFrame)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error fetching customer service data:', error);
    throw error;
  }
}

export async function getInquiries(timeFrame: TimeFrame) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('time_frame', timeFrame)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error fetching inquiries data:', error);
    throw error;
  }
}

export async function getMaintenanceStatus(timeFrame: TimeFrame) {
  try {
    const { data, error } = await supabase
      .from('maintenance_status')
      .select('*')
      .eq('time_frame', timeFrame)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error fetching maintenance status data:', error);
    throw error;
  }
}

export async function getCustomerSatisfaction(timeFrame: TimeFrame) {
  try {
    const { data, error } = await supabase
      .from('customer_satisfaction')
      .select('*')
      .eq('time_frame', timeFrame)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error fetching customer satisfaction data:', error);
    throw error;
  }
}