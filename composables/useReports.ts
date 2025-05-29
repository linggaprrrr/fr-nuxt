
interface TransactionReport {
  unit: string
  jumlah_transaksi: number
  total_pendapatan: number
}

interface AllUnitReportResponse {
  start_date: string
  end_date: string
  data: TransactionReport[]
}

export interface TransactionData {
  id: string
  user: string
  final_price: number
  created_at: string
}

export interface PerUnitReport {
  unit_id: string
  unit_name: string
  start_date: string 
  end_date: string   
  jumlah_transaksi: number
  total_pendapatan: number
  data: TransactionData[]
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
  total_pendapatan_hari_ini: number
  pendapatan_per_unit: PendapatanPerUnit[]
  total_transaksi_hari_ini: number
  total_user: number
  transaksi_terakhir: TransaksiTerakhir[]
  pendapatan_per_hari: PendapatanPerHari[]
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
    
    return data
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


  return {    
    getDasboardStatistcs,
    getTransactionsReport,
    getAllUnitReports,
    getPerUnitReports,
  }
}
