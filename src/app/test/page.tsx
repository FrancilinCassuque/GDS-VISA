'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userIndex } from "@/db"
import { userStore } from "@/store"
import { IUser } from "@/types"
import { Separator } from "@radix-ui/react-select"
import Link from "next/link"
import { useEffect, useState } from "react"
import ImageUpload from "../_components/image/upload"

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// function stringAvatar(name: string) {
//   const nomes = name.split(' ')
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: nomes.length > 1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.split(' ')[0][0]}`,
//   };
// }

export default function Test() {
  
  return (
    <ImageUpload/>
  )
}