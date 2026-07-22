import { siteConfig } from "@/lib/site"

export function verifyAdminCredentials(
  email: string,
  password: string
): boolean {
  const adminEmail = siteConfig.admin.email
  const adminPassword = siteConfig.admin.password

  return (
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
    password === adminPassword
  )
}
