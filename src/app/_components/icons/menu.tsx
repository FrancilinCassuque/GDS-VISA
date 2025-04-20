import { ClipboardList, ClipboardPlus, FileBox, FilePlus2, FileStack, ListRestart } from "lucide-react"


export const IconHome = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
export const IconPainel = (props: any) => {
  return (
    <ListRestart {...props} />
  )
}
export const IconUsers = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export const IconNewInf = (props: any) => {
  return (
    <FilePlus2 {...props} />
  )
}

export const IconNewInf2 = (props: any) => {
  return (
    <FileBox {...props} />
  )
}

export const IconNewInf3 = (props: any) => {
  return (
    <ClipboardPlus {...props} />
  )
}

export const IconNewInf4 = (props: any) => {
  return (
    <ClipboardList {...props} />
  )
}
export const IconFactura = (props: any) => {
  return (
    <FileStack {...props} />
  )
}
