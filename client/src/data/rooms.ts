import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { isAuthenticated } from './config'

export type Room = {
  id: string
  ownerId: string
  name: string
}

const getRoom = async (roomId: string): Promise<Room> => {
  const response = await axios.get(`/rooms/${roomId}`)
  return response.data.room
}

export const useRoom = (roomId?: string): UseQueryResult<Room> => {
  return useQuery({
    queryKey: ['rooms', roomId],
    enabled: isAuthenticated() && !!roomId,
    queryFn: () => getRoom(roomId ?? ''),
  })
}

const createRoom = async (): Promise<Room> => {
  const response = await axios.post('/rooms')
  return response.data.room
}

export const useCreateRoom = (onSuccess: (room: Room) => void) => {
  return useMutation({
    mutationFn: () => createRoom(),
    onSuccess,
  })
}

const joinRoom = async (roomId: string) => {
  await axios.post(`/rooms/${roomId}/join`)
}

export const useJoinRoom = (roomId: string) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: () => joinRoom(roomId),
    onSuccess: () => {
      client.invalidateQueries(['me'])
    },
  })
}
