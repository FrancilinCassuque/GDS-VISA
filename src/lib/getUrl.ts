export const getUrl = (path?: string) => {
  const baseURL = process.env.NEXTAUTH_URL
  const normalise = path && !path.startsWith('/') ? `/${path}` : path || ''
  return `${baseURL}${normalise}`
}