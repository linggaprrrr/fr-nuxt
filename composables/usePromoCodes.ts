import type { GetDiscountsResponse, Discount } from "@/types/promo_code"

export const usePromoCodes = () => {

    const getPromoCodes = async ({
        page = 1,
        limit = 25,
        search = null,
        status = null,
        discount_type = null
    }: {
        page?: number
        limit?: number
        search?: string | null
        status?: string | null
        discount_type?: string | null
    }): Promise<GetDiscountsResponse> => {
        const params: Record<string, any> = { page, limit }
        if (search) params.search = search
        if (status) params.status = status
        if (discount_type) params.discount_type = discount_type

        const response = await authFetch<GetDiscountsResponse>('discounts/', {
            method: 'GET',
            params
        })

        return response
    }

    const createPromoCode = async (data: Partial<Discount>) => {
        const response = await authFetch('discounts/', {
            method: 'POST',
            body: data
        })
        return response
    }

    const updatePromoCodeById = async (id: string, data: Partial<Discount>) => {
        const response = await authFetch(`discounts/${id}`, {
            method: 'PUT',
            body: data
        })
        return response
    }

    const getPromoCodeById = async (id: string) => {
        const response = await authFetch(`discounts/${id}`, {
            method: 'GET',
        })
        return response
    }

    const deletePromoCodeById = async (id: string) => {
        const response = await authFetch(`discounts/${id}`, {
            method: 'DELETE',
        })
        return response
    }

    return {
        getPromoCodes,
        createPromoCode,
        updatePromoCodeById,
        getPromoCodeById,
        deletePromoCodeById
    }
}
