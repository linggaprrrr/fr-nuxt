import type { GetEventsResponse, Event } from "@/types/event"

export const useEvents = () => {

    const getEvents = async ({
        page = 1,
        limit = 25,
        search = null,
        is_active = null,
    }: {
        page?: number
        limit?: number
        search?: string | null
        is_active?: boolean | null
    }): Promise<GetEventsResponse> => {
        const params: Record<string, any> = { page, limit }
        if (search) params.search = search
        if (is_active !== null) params.is_active = is_active

        const response = await authFetch<GetEventsResponse>('events/', {
            method: 'GET',
            params
        })

        return response
    }

    const createEvent = async (data: Partial<Event>) => {
        const response = await authFetch<Event>('events/', {
            method: 'POST',
            body: data
        })
        return response
    }

    const updateEventById = async (id: string, data: Partial<Event>) => {
        const response = await authFetch<Event>(`events/${id}`, {
            method: 'PUT',
            body: data
        })
        return response
    }

    const deleteEventById = async (id: string) => {
        const response = await authFetch(`events/${id}`, {
            method: 'DELETE',
        })
        return response
    }

    return {
        getEvents,
        createEvent,
        updateEventById,
        deleteEventById,
    }
}
