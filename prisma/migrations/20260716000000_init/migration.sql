-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TipoProducto" AS ENUM ('PRODUCTO', 'SERVICIO');

-- CreateEnum
CREATE TYPE "EstadoProducto" AS ENUM ('ACTIVO', 'INACTIVO', 'AGOTADO');

-- CreateEnum
CREATE TYPE "FuenteCliente" AS ENUM ('WEB', 'REFERIDO', 'WHATSAPP', 'TELEFONO');

-- CreateEnum
CREATE TYPE "EstadoCliente" AS ENUM ('PROSPECTO', 'ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EstadoCotizacion" AS ENUM ('BORRADOR', 'ENVIADA', 'APROBADA', 'RECHAZADA', 'EXPIRADA');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('CONCIERTO', 'FERIA', 'FESTIVAL', 'CORPORATIVO', 'GOBIERNO', 'PRIVADO');

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "CategoriaFaq" AS ENUM ('GENERAL', 'PRODUCTOS', 'SERVICIOS', 'PRECIOS', 'EVENTOS');

-- CreateEnum
CREATE TYPE "EstadoFaq" AS ENUM ('PUBLICADO', 'BORRADOR');

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "icono" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombreCorto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "descripcionCorta" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "tipo" "TipoProducto" NOT NULL,
    "badge" TEXT,
    "imagenPrincipal" TEXT NOT NULL,
    "imagenes" JSONB,
    "especificaciones" JSONB,
    "precioBase" DECIMAL(12,2),
    "unidadMedida" TEXT NOT NULL DEFAULT 'unidad',
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "estado" "EstadoProducto" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nombreEmpresa" TEXT NOT NULL,
    "nombreContacto" TEXT,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "sector" TEXT,
    "ciudad" TEXT,
    "direccion" TEXT,
    "notas" TEXT,
    "fuente" "FuenteCliente" NOT NULL DEFAULT 'WEB',
    "estado" "EstadoCliente" NOT NULL DEFAULT 'PROSPECTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "EstadoCotizacion" NOT NULL DEFAULT 'BORRADOR',
    "fechaEvento" TIMESTAMP(3),
    "ubicacionEvento" TEXT,
    "tipoEvento" TEXT,
    "duracionDias" INTEGER,
    "costoTotal" DECIMAL(12,2),
    "precioVenta" DECIMAL(12,2),
    "margen" DECIMAL(5,2),
    "moneda" TEXT NOT NULL DEFAULT 'COP',
    "creadoPorId" TEXT NOT NULL,
    "notasInternas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CotizacionItem" (
    "id" TEXT NOT NULL,
    "cotizacionId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DECIMAL(12,2) NOT NULL,
    "precioTotal" DECIMAL(12,2) NOT NULL,
    "descripcionPersonalizada" TEXT,
    "costoUnitario" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CotizacionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "tipo" "TipoEvento",
    "descripcion" TEXT,
    "imagenPrincipal" TEXT,
    "imagenes" JSONB,
    "logoCliente" TEXT,
    "ciudad" TEXT,
    "cantidadUnidades" INTEGER,
    "productosUsados" JSONB,
    "testimonio" TEXT,
    "nombreTestimonio" TEXT,
    "cargoTestimonio" TEXT,
    "estrellasTestimonio" INTEGER,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "estado" TEXT NOT NULL DEFAULT 'PUBLICADO',
    "fecha" TIMESTAMP(3),
    "horaInicio" TEXT,
    "horaFin" TEXT,
    "ubicacion" TEXT,
    "tipoEvento" TEXT,
    "numeroInvitados" INTEGER,
    "clienteId" TEXT,
    "contactoNombre" TEXT,
    "contactoTelefono" TEXT,
    "contactoEmail" TEXT,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'EDITOR',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "ultimoAcceso" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuracion" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "nombreSitio" TEXT NOT NULL DEFAULT 'Junisama Inversiones S.A.S',
    "telefono" TEXT NOT NULL DEFAULT '+57 350 708 9584',
    "email" TEXT NOT NULL DEFAULT 'soporte@junisama.com',
    "direccionMedellin" TEXT NOT NULL DEFAULT 'Calle 13 sur #51C-54',
    "direccionBogota" TEXT NOT NULL DEFAULT 'Cra 58b bis # 131A 51',
    "whatsappNumero" TEXT NOT NULL DEFAULT '573507089584',
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "seoTitleDefault" TEXT,
    "seoDescriptionDefault" TEXT,
    "scriptAnalytics" TEXT,
    "mensajeWhatsApp" TEXT NOT NULL DEFAULT 'Hola, me gustaría recibir información sobre sus servicios.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "categoria" "CategoriaFaq" NOT NULL DEFAULT 'GENERAL',
    "orden" INTEGER NOT NULL DEFAULT 0,
    "estado" "EstadoFaq" NOT NULL DEFAULT 'PUBLICADO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "Categoria"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_slug_key" ON "Producto"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Cotizacion_codigo_key" ON "Cotizacion"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Evento_slug_key" ON "Evento"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CotizacionItem" ADD CONSTRAINT "CotizacionItem_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "Cotizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CotizacionItem" ADD CONSTRAINT "CotizacionItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

