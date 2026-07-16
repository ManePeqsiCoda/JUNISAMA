"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { ProductoForm } from "@/components/admin/producto-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { productos as productosMock, categorias as categoriasMock } from "@/lib/mocks"
import type { Producto, Categoria } from "@/lib/mocks"

type ProductoWithCategoria = Producto & { categoria: Categoria }

function formatCurrency(value: number | null | undefined) {
  if (value == null) return "—"
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value))
}

const estadoStyles: Record<
  Producto["estado"],
  { label: string; bg: string; text: string }
> = {
  ACTIVO: {
    label: "Activo",
    bg: "bg-[#22C55E]/15",
    text: "text-[#22C55E]",
  },
  INACTIVO: {
    label: "Inactivo",
    bg: "bg-[#EF4444]/15",
    text: "text-[#EF4444]",
  },
  AGOTADO: {
    label: "Agotado",
    bg: "bg-[#F59E0B]/15",
    text: "text-[#F59E0B]",
  },
}

const tipoStyles: Record<Producto["tipo"], { label: string; bg: string; text: string }> = {
  PRODUCTO: {
    label: "Producto",
    bg: "bg-[#3B82F6]/15",
    text: "text-[#3B82F6]",
  },
  SERVICIO: {
    label: "Servicio",
    bg: "bg-purple-500/15",
    text: "text-purple-400",
  },
}

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<ProductoWithCategoria[]>([])
  const [categorias] = useState<Categoria[]>(categoriasMock)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] =
    useState<ProductoWithCategoria | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    producto: ProductoWithCategoria | null
  }>({ open: false, producto: null })

  const limit = 10

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProductos(productosMock as ProductoWithCategoria[])
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredProductos = useMemo(() => {
    const term = debouncedSearch.toLowerCase()
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(term) ||
      p.nombreCorto.toLowerCase().includes(term) ||
      p.categoria.nombre.toLowerCase().includes(term)
    )
  }, [productos, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / limit))
  const paginatedProductos = useMemo(() => {
    const start = (page - 1) * limit
    return filteredProductos.slice(start, start + limit)
  }, [filteredProductos, page])

  const handleCreate = () => {
    setSelectedProduct(null)
    setDrawerOpen(true)
  }

  const handleEdit = (producto: ProductoWithCategoria) => {
    setSelectedProduct(producto)
    setDrawerOpen(true)
  }

  const handleDelete = () => {
    if (!deleteDialog.producto) return
    setProductos((prev) => prev.filter((p) => p.id !== deleteDialog.producto!.id))
    toast.success("Producto eliminado")
    setDeleteDialog({ open: false, producto: null })
  }

  const handleToggleEstado = (producto: ProductoWithCategoria) => {
    const nuevoEstado = producto.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO"
    setProductos((prev) =>
      prev.map((p) => (p.id === producto.id ? { ...p, estado: nuevoEstado } : p))
    )
    toast.success(`Estado actualizado a ${nuevoEstado.toLowerCase()}`)
  }

  const handleSuccess = (producto: ProductoWithCategoria) => {
    setProductos((prev) => {
      const exists = prev.find((p) => p.id === producto.id)
      if (exists) {
        return prev.map((p) => (p.id === producto.id ? producto : p))
      }
      return [...prev, producto]
    })
    setDrawerOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-sm font-extrabold uppercase tracking-widest text-foreground">
            Productos
          </h1>
          <p className="text-sm text-muted-foreground">
            Gestión del catálogo de productos y servicios
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-input bg-background pl-9 text-foreground"
        />
      </div>

      {/* Table */}
      <Card className="bg-card ring-1 ring-foreground/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Imagen</TableHead>
                <TableHead className="text-muted-foreground">Nombre</TableHead>
                <TableHead className="text-muted-foreground">
                  Categoría
                </TableHead>
                <TableHead className="text-muted-foreground">Tipo</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="text-muted-foreground">Precio</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={7} className="py-12 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                  </TableCell>
                </TableRow>
              ) : paginatedProductos.length === 0 ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/20">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">
                        No hay productos
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Crea el primer producto para comenzar.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProductos.map((producto) => {
                  const estadoStyle = estadoStyles[producto.estado]
                  const tipoStyle = tipoStyles[producto.tipo]
                  return (
                    <TableRow key={producto.id} className="border-border">
                      <TableCell>
                        <Image
                          src={producto.imagenPrincipal}
                          alt={producto.nombre}
                          width={40}
                          height={40}
                          className="rounded-md bg-muted object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {producto.nombre}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {producto.nombreCorto}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          {producto.categoria.nombre}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                            tipoStyle.bg,
                            tipoStyle.text
                          )}
                        >
                          {tipoStyle.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleToggleEstado(producto)}
                          className={cn(
                            "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-opacity hover:opacity-80",
                            estadoStyle.bg,
                            estadoStyle.text
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              producto.estado === "ACTIVO"
                                ? "bg-[#22C55E]"
                                : producto.estado === "AGOTADO"
                                  ? "bg-[#F59E0B]"
                                  : "bg-[#EF4444]"
                            )}
                          />
                          {estadoStyle.label}
                        </button>
                      </TableCell>
                      <TableCell className="text-foreground">
                        {formatCurrency(
                          producto.precioBase ? Number(producto.precioBase) : null
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Editar producto"
                            onClick={() => handleEdit(producto)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Eliminar producto"
                            onClick={() =>
                              setDeleteDialog({ open: true, producto })
                            }
                            className="text-muted-foreground hover:text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {!loading && paginatedProductos.length > 0 && (
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Página anterior"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Página siguiente"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Drawer */}
      <ProductoForm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        producto={selectedProduct}
        categorias={categorias}
        onSuccess={handleSuccess}
      />

      {/* Delete dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              ¿Eliminar producto?
            </DialogTitle>
            <DialogDescription>
              Esta acción desactivará el producto{" "}
              <strong>{deleteDialog.producto?.nombre}</strong>. Puedes
              reactivarlo después.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() =>
                setDeleteDialog({ open: false, producto: null })
              }
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-full sm:w-auto"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
