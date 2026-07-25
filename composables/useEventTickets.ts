import type { GetEventTicketsResponse, EventTicket } from "@/types/event_ticket"

export const useEventTickets = () => {

    const getEventTickets = async ({
        page = 1,
        limit = 25,
        search = null,
        is_used = null,
    }: {
        page?: number
        limit?: number
        search?: string | null
        is_used?: boolean | null
    }): Promise<GetEventTicketsResponse> => {
        const params: Record<string, any> = { page, limit }
        if (search) params.search = search
        if (is_used !== null) params.is_used = is_used

        const response = await authFetch<GetEventTicketsResponse>('event-tickets/', {
            method: 'GET',
            params
        })

        return response
    }

    const createEventTicket = async (data: Partial<EventTicket>) => {
        const response = await authFetch('event-tickets/', {
            method: 'POST',
            body: data
        })
        return response
    }

    const bulkCreateEventTickets = async (data: {
        ticket_codes: string[]
        event_name: string
        unit_id: string | null
        valid_from: string | null
        valid_until: string | null
        is_active: boolean
    }) => {
        const response = await authFetch<GetEventTicketsResponse>('event-tickets/bulk', {
            method: 'POST',
            body: data
        })
        return response
    }

    const updateEventTicketById = async (id: string, data: Partial<EventTicket>) => {
        const response = await authFetch(`event-tickets/${id}`, {
            method: 'PUT',
            body: data
        })
        return response
    }

    const deleteEventTicketById = async (id: string) => {
        const response = await authFetch(`event-tickets/${id}`, {
            method: 'DELETE',
        })
        return response
    }

    return {
        getEventTickets,
        createEventTicket,
        bulkCreateEventTickets,
        updateEventTicketById,
        deleteEventTicketById,
    }
}
