
export interface TodayOutlet {
  outlet_id: string
  outlet_name: string
  revenue: number
  transactions: number
  last_transaction_at: string | null
}

export interface TodaySnapshot {
  revenue_today: number
  revenue_yesterday: number
  // null = no basis to compare (nothing yesterday), which the UI must show as
  // an em dash rather than 0%.
  revenue_delta_pct: number | null
  transactions_today: number
  transactions_yesterday: number
  transactions_delta_pct: number | null
  outlets: TodayOutlet[]
}

export interface OperationalAlert {
  kind: 'kiosk_offline' | 'printer_down' | 'media_low' | 'print_failed' | 'txn_stuck'
  severity: 'high' | 'medium' | 'low'
  outlet_name: string | null
  message: string
}

interface TransactionReport {
  tanggal: string // YYYY-MM-DD
  unit: string
  outlet: string
  photo_type: string
  foto_terjual: number
  total_pendapatan: number
}

interface AllUnitReportResponse {
  start_date: string
  end_date: string  
  data: TransactionReport[]
}

export interface TransactionData {
  id: string
  trx_code: string
  user: string
  foto_terjual: number
  final_price: number
  created_at: string
}

export interface PerUnitReport {
  unit_id: string
  unit_name: string
  start_date: string 
  end_date: string   
  jumlah_transaksi: number
  jumlah_foto_terjual: number
  total_pendapatan: number
  data: TransactionData[]
}

export interface OutletData {
  photo_type: string
  jumlah_transaksi: number
  total_pendapatan: number
}

export interface PerOutletReport {
  outlet_id: string
  outlet_name: string
  start_date: string 
  end_date: string   
  jumlah_transaksi: number
  jumlah_foto_terjual: number
  total_pendapatan: number
  data: OutletData[]
}


export interface PendapatanPerUnit {
  unit: string
  total: number
}

export interface TransaksiTerakhir {
  id: string
  final_price: number
  created_at: string 
  user_name: string
  unit_name: string
}

export interface PendapatanPerHari {
  tanggal: string // YYYY-MM-DD
  total: number
}

export interface ReportResponse {
  // Total pendapatan
  total_pendapatan_hari_ini: number
  total_pendapatan_minggu_ini: number
  total_pendapatan_bulan_ini: number
  total_pendapatan_tahun_ini: number

  // Total transaksi
  total_transaksi_hari_ini: number
  total_transaksi_minggu_ini: number
  total_transaksi_bulan_ini: number
  total_transaksi_tahun_ini: number

  // Pendapatan lainnya
  pendapatan_per_unit: PendapatanPerUnit[]
  pendapatan_per_hari: PendapatanPerHari[]
  pendapatan_per_bulan: PendapatanPerBulan[]

  // Info tambahan
  total_user: number
  transaksi_terakhir: TransaksiTerakhir[]
}

export interface PendapatanPerUnit {
  unit: string
  total: number
}

export interface PendapatanPerHari {
  tanggal: string 
  total: number
}

export interface PendapatanPerBulan {
  bulan: string 
  total: number
}

export interface TransaksiTerakhir {
  id: string
  final_price: number
  created_at: string
  user_name: string
  email: string
}




export interface TransactionsReport {
  start_date: string  
  end_date: string    
  jumlah_transaksi: number
  total_pendapatan: number
  data: TransactionData[]
}

export function useReports() {  
  const getAllUnitReports = async (
    startDate: string | null,
    endDate: string | null
  ): Promise<AllUnitReportResponse | null> => {    
    const data = await authFetch<AllUnitReportResponse>(`/statistics/reports/transactions-all-unit`, {        
      method: 'GET',
      params: {
        start_date: startDate,
        end_date: endDate
      }
    })    
    
    return data

    
  }


  const getPerUnitReports = async (
    unit_id: string,
    startDate: string | null,
    endDate: string | null
  ): Promise<PerUnitReport | null> => {
    const data = await authFetch<PerUnitReport>(`/statistics/reports/transactions-by-unit`, {      
      params: {
        unit_id,
        start_date: startDate,
        end_date: endDate,
      },
    })
    console.log(data)
    return data
  }

  const getPerOutletReports = async (
    outlet_id: string,
    startDate: string | null,
    endDate: string | null
  ): Promise<PerOutletReport | null> => {
    const data = await authFetch<PerOutletReport>(`/statistics/reports/transactions-by-outlet-id`, {      
      params: {
        outlet_id: outlet_id,
        start_date: startDate,
        end_date: endDate,
      },
    })
    console.log(data)
    return data
  }

  // Operational alerts for the dashboard strip. Kept separate from the stats
  // call so a slow/failed stats query never hides "a kiosk is offline".
  const getOperationalAlerts = async (): Promise<{ data: OperationalAlert[], count: number }> => {
    return await authFetch(`/statistics/alerts`, { method: 'GET' })
  }

  const getTodaySnapshot = async (): Promise<TodaySnapshot> => {
    return await authFetch(`/statistics/today`, { method: 'GET' })
  }

  const getDasboardStatistcs = async (): Promise<ReportResponse | null>  => {
    const data = await authFetch<ReportResponse>(`/statistics/`, {      
      method: 'GET'        
    })        
    return data
  }

  const getTransactionsReport = async (
    startDate: string | null,
    endDate: string | null
  ): Promise<TransactionReport | null> => {
    const data = await authFetch<TransactionReport>(`/statistics/reports/transactions`, {      
      method: 'GET',
      params: {
        start_date: startDate,
        end_date: endDate,
      },        
    })
    
    return data
  }

  const getFotoTerjualReport = async (startDate: string, endDate: string) => {
    const config = useRuntimeConfig()
    // Call ke endpoint /reports/foto-terjual
    const response = await $fetch(`${config.public.apiBase}/statistics/reports/transactions`, {
      method: 'GET',
      query: { start_date: startDate, end_date: endDate }
    })
    return response
  }
  
  

  return {    
    getOperationalAlerts,
    getTodaySnapshot,
    getDasboardStatistcs,
    getTransactionsReport,
    getAllUnitReports,
    getPerUnitReports,
    getPerOutletReports,
    getFotoTerjualReport
  }
}
