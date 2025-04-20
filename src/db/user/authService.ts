// src/actions/userActions.ts
'use server';

import { IUser, IUserAuth, userlogin } from "@/types";
import prisma from "../prisma.index";
import { getServerSession } from "next-auth";
import { config } from "@/lib/auth";
import { CriptPassword } from "@/lib/criptPass";
import { revalidatePath } from "next/cache";

// Função para autenticar o usuário
export async function auth(): Promise<IUserAuth | Error> {
  try {
    // Obtém a sessão do usuário
    const session = await getServerSession(config);

    if (!session?.user?.email) {
      return new Error('Usuário não autenticado.');
    }

    // Busca o usuário no banco de dados usando o email da sessão
    const userCompleto = await prisma.user.findUnique({
      where: { email: session.user.email },
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
    const funcao = pessoa?.funcoes[0];
    const address = pessoa?.Address[0];

    const auth: IUserAuth = {
      id: userCompleto.id,
      name: userCompleto.name,
      email: userCompleto.email,
      image: userCompleto.image,
      password: userCompleto.password,
      emailVerified: userCompleto.emailVerified,
      createdAt: userCompleto.createdAt,
      updatedAt: userCompleto.updatedAt,
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
          id: funcao?.id || 0,
          funcao: funcao?.funcao || '',
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

    return auth;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao autenticar usuário');
  }
}

// Função para fazer login
export async function login(user: Omit<userlogin, 'id'>): Promise<IUser | Error> {
  try {
    const userFinded = await prisma.user.findUnique({
      where: { email: user.email.toLowerCase() },
    });

    if (!userFinded) {
      return new Error('Conta não existe.');
    }

    const passwordHash = CriptPassword(user.password);
    if (userFinded.password !== passwordHash) {
      return new Error('Palavra-passe errada.');
    }

    revalidatePath('/');
    return userFinded;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao fazer login');
  }
}