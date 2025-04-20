// src/actions/userActions.ts
'use server';

import { IUser, IUserShow, IUpdateUser, userlogin } from "@/types";
import prisma from "../prisma.index";
import { CriptPassword } from "@/lib/criptPass";
import { revalidatePath } from "next/cache";

// Função para criar um usuário
export async function userCreate(formData: Omit<userlogin, 'id'>): Promise<string | Error> {
  try {
    const criptPass = CriptPassword(formData.password);
    const name = `user_${Date.now()}`;

    const newUser = await prisma.user.create({
      data: {
        email: formData.email.toLowerCase(),
        password: criptPass,
        name: name,
      },
    });

    return newUser.id;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao registrar usuário');
  }
}

// Função para buscar um usuário por ID
export async function ShowUser(id: string): Promise<IUserShow | Error> {
  try {
    const userCompleto = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            identidades: true,
            funcoes: { orderBy: { updatedAt: "desc" }, select: { id: true, funcao: true } },
            Address: { select: { id: true, rua: true, bairro: true, comuna: true, municipio: true, provincia: true, pais: true } },
          },
        },
      },
    });

    if (!userCompleto) {
      return new Error('Conta não existe.');
    }

    const pessoa = userCompleto.profile[0];
    const identidade = pessoa?.identidades.find((ind) => ind.tipo === 'NIF' || ind.tipo === 'PASSAPORTE');
    const ocupacao = pessoa?.funcoes[0];
    const address = pessoa?.Address[0];

    const userShow: IUserShow = {
      id: userCompleto.id,
      name: userCompleto.name,
      email: userCompleto.email,
      image: userCompleto.image,
      password: userCompleto.password,
      emailVerified: userCompleto.emailVerified,
      updatedAt: userCompleto.updatedAt,
      createdAt: userCompleto.createdAt,
      pessoa: {
        id: pessoa?.id || '',
        nome: pessoa?.nome || '',
        Apelido: pessoa?.Apelido || '',
        genero: pessoa?.genero || '',
        pais: pessoa?.pais || '',
        telefone: pessoa?.telefone || '',
        bio: pessoa?.bio || '',
        identidade: {
          id: identidade?.id || '',
          numero: identidade?.numero || '',
          tipo: identidade?.tipo || '',
        },
        funcao: {
          id: ocupacao?.id || 0,
          funcao: ocupacao?.funcao || '',
        },
        address: {
          id: address?.id || 0,
          rua: address?.rua || '',
          bairro: address?.bairro || '',
          comuna: address?.comuna || '',
          municipio: address?.municipio || '',
          provincia: address?.provincia || '',
          pais: address?.pais || '',
        },
      },
    };

    revalidatePath('/');
    return userShow;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar usuário');
  }
}

// Função para listar usuários
export async function userIndex(page = 1): Promise<IUser[] | Error> {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar usuários');
  }
}

// Função para atualizar um usuário
export async function updateUser(userId: string, user?: IUpdateUser, userName = ''): Promise<string | Error> {
  try {
    const data = userName ? { name: userName } : { name: user?.name, email: user?.email, image: user?.image };
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    if (updatedUser) {
      return updatedUser.id;
    }

    return new Error('Usuário não encontrado');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar usuário');
  }
}

// Função para excluir um usuário
export async function deleteUser(id: string): Promise<string | Error> {
  try {
    const userDeleted = await prisma.user.delete({ where: { id } });
    return userDeleted.id;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao excluir usuário');
  }
}