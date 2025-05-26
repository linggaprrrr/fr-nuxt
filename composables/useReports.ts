import { baseURL } from "process"
import { load } from "webfontloader"

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
  start_date: string  // format YYYY-MM-DD
  end_date: string    // format YYYY-MM-DD
  jumlah_transaksi: number
  total_pendapatan: number
  data: TransactionData[]
}

export function useReports() {
  const config = useRuntimeConfig()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const getAllUnitReports = async (
    startDate: string | null,
    endDate: string | null
  ): Promise<AllUnitReportResponse | null> => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<AllUnitReportResponse>(`/statistics/reports/transactions-all-unit`, {
        baseURL: config.public.apiBase,
        method: 'GET',
        params: {
          start_date: startDate,
          end_date: endDate
        }
      })
      loading.value = false
      return data
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }


  const getPerUnitReports = async (
    unit_id: string,
    startDate: string | null,
    endDate: string | null
  ): Promise<PerUnitReport | null> => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<PerUnitReport>(`/statistics/reports/transactions-by-unit`, {
        baseURL: config.public.apiBase,
        params: {
          unit_id,
          start_date: startDate,
          end_date: endDate,
        },
      })
      console.log(data)
      loading.value = false
      return data
    } catch (err: any) {
      loading.value = false
      error.value = err.message || 'Unknown error'      
      return null
    }
  }

  const getDasboardStatistcs = async (): Promise<ReportResponse | null>  => {
    loading.value = true
    try {
      const data = await $fetch<ReportResponse>(`/statistics/`, {
        baseURL: config.public.apiBase,
        method: 'GET'        
      })
      loading.value = false
      return data
    } catch (err: any) {
      loading.value = false
      error.value = err.message || 'Unknown error'
      return null
    }
  }

  const getTransactionsReport = async (
    startDate: string | null,
    endDate: string | null
  ): Promise<TransactionReport | null> => {
    loading.value = true

    try {
      const data = await $fetch<TransactionReport>(`/statistics/reports/transactions`, {
        baseURL: config.public.apiBase,
        method: 'GET',
        params: {
          start_date: startDate,
          end_date: endDate,
        },        
      })
      loading.value = false
      return data
    } catch (err: any) {
      return err
    }
  }


  return {
    loading,
    error,
    getDasboardStatistcs,
    getTransactionsReport,
    getAllUnitReports,
    getPerUnitReports,
  }
}
