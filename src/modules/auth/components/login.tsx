"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { z } from "zod"

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const router = useRouter()

  // Esquema de validación con Zod
  const loginSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar datos con Zod
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      const fieldErrors = validation.error.format()
      setErrors({
        email: fieldErrors.email?._errors[0] || "",
        password: fieldErrors.password?._errors[0] || ""
      })
      return
    }

    // Reiniciar errores si todo es válido
    setErrors({})

    // Lógica de inicio de sesión
    if (email === "fidencia@gmail.com" && password === "123456789") {
      router.push("/admin")
    } else {
      setErrors({ form: "Correo o contraseña incorrectos" })
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <img
        src="/amazonas-login.webp"
        alt="banner"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900/70 via-gray-800/50 to-gray-900/40 absolute inset-0 z-10">
        <header className="absolute top-4 left-6 z-20">
          <h1 className="text-2xl font-semibold text-white text-start max-w-sm">
            Sistemas de control de tareas diarias{" "}
            <span className="text-yellow-500">Bitel</span>
          </h1>
        </header>
        <Card className="w-full max-w-md">
          <CardHeader>
            <img
              src="/brands/logo_bitel.png"
              alt="logo-img"
              className="h-24 mx-auto"
            />
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <section>
                {errors.form && (
                  <div className="text-red-500 text-sm font-medium">
                    {errors.form}
                  </div>
                )}
              </section>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Iniciar sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
