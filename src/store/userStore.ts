// src/stores/useUserStore.ts
import { create } from 'zustand'
import { IUpdateUser, IUser, IUserAuth, IUserShow, userlogin } from '@/types'
import { userCreate, ShowUser, userIndex, updateUser, deleteUser, login, auth } from '@/db'
import { toast } from 'sonner'

interface UserState {
  users: IUser[]
  currentUser: IUserAuth | null
  loading: boolean
  error: string | null
  createUser: (formData: Omit<userlogin, 'id'>) => Promise<void>
  loginUser: (user: Omit<userlogin, 'id'>) => Promise<void>
  authenticateUser: () => Promise<void>
  fetchUserById: (id: string) => Promise<void | IUserShow>
  fetchUsers: () => Promise<void>
  updateUser: (userId: string, user?: IUpdateUser, userName?: string) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  // Criar usuário
  createUser: async (formData) => {
    set({ loading: true, error: null })
    try {
      const result = await userCreate(formData)
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        toast.success('Agente Registrado com sucesso✔')
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error('Erro ao criar usuário')
    } finally {
      set({ loading: false })
    }
  },

  // Fazer login
  loginUser: async (user) => {
    set({ loading: true, error: null })
    try {
      const result = await login(user)
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        // set({ currentUser: result })
        toast.success('Login realizado com sucesso!')
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error(`Erro ao fazer login`)
    } finally {
      set({ loading: false })
    }
  },

  // Autenticar usuário
  authenticateUser: async () => {
    set({ loading: true, error: null })
    try {
      const result = await auth()
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        set({ currentUser: result })
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error('Erro ao autenticar usuário')
    } finally {
      set({ loading: false })
    }
  },

  // Buscar usuário por ID
  fetchUserById: async (id) => {
    set({ loading: true, error: null })
    try {
      const result = await ShowUser(id)
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        return result
        // set({ currentUser: result })
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error('Erro ao buscar usuário')
    } finally {
      set({ loading: false })
    }
  },

  // Listar usuários
  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const result = await userIndex()
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        set({ users: result })
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error('Erro ao listar usuários')
    } finally {
      set({ loading: false })
    }
  },

  // Atualizar usuário
  updateUser: async (userId, user, userName) => {
    set({ loading: true, error: null })
    try {
      const result = await updateUser(userId, user, userName)
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        toast.success('Usuário atualizado com sucesso!')
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error('Erro ao atualizar usuário')
    } finally {
      set({ loading: false })
    }
  },

  // Excluir usuário
  deleteUser: async (id) => {
    set({ loading: true, error: null })
    try {
      const result = await deleteUser(id)
      if (result instanceof Error) {
        toast.error(result.message)
      } else {
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }))
        toast.success('Usuário excluído com sucesso!')
      }
    } catch (error) {
      set({ error: (error as { message: string }).message || 'Erro desconhecido' })
      toast.error('Erro ao excluir usuário')
    } finally {
      set({ loading: false })
    }
  },
}))