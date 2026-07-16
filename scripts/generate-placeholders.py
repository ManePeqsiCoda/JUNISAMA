"""Genera placeholders descriptivos para productos, hero, OG y quienes-somos.

Estos archivos son provisionales mientras se obtienen las fotografías reales.
Cada imagen incluye un mensaje claro que describe el contenido pendiente.
"""

from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_REGULAR = "C:/Windows/Fonts/arial.ttf"


def load_font(size, bold=False):
    try:
        return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)
    except Exception:
        return ImageFont.load_default()


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def gradient_background(width, height, color_top, color_bottom):
    top = hex_to_rgb(color_top)
    bottom = hex_to_rgb(color_bottom)
    img = Image.new("RGB", (width, height), top)
    draw = ImageDraw.Draw(img)
    for y in range(height):
        r = int(top[0] + (bottom[0] - top[0]) * y / height)
        g = int(top[1] + (bottom[1] - top[1]) * y / height)
        b = int(top[2] + (bottom[2] - top[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img


def draw_centered_text(draw, text, font, y, fill, width, anchor="mm"):
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = width // 2
    draw.text((x, y), text, font=font, fill=fill, anchor=anchor)
    return text_width


def generate_product_image(path, title, subtitle, accent):
    width, height = 800, 600
    bg = gradient_background(width, height, "#1e293b", "#0f172a")
    draw = ImageDraw.Draw(bg)

    # Marco decorativo
    margin = 24
    draw.rounded_rectangle(
        [margin, margin, width - margin, height - margin],
        radius=24,
        outline=accent,
        width=4,
    )

    # Círculo central con inicial
    center_x, center_y = width // 2, height // 2 - 40
    radius = 90
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        fill=accent,
    )
    initial = title.split()[0][0].upper()
    font_initial = load_font(72, bold=True)
    draw.text((center_x, center_y), initial, font=font_initial, fill="#ffffff", anchor="mm")

    # Título
    font_title = load_font(40, bold=True)
    draw_centered_text(draw, title, font_title, height // 2 + 80, "#ffffff", width)

    # Subtítulo
    font_sub = load_font(22)
    draw_centered_text(draw, subtitle, font_sub, height // 2 + 130, "#cbd5e1", width)

    # Marca de placeholder
    font_water = load_font(16)
    draw_centered_text(
        draw,
        "FOTO REAL PENDIENTE — reemplazar por imagen real antes de producción",
        font_water,
        height - 46,
        "#94a3b8",
        width,
    )

    os.makedirs(os.path.dirname(path), exist_ok=True)
    bg.save(path, "JPEG", quality=85)
    print(f"[OK] {path}")


def generate_hero_image(path):
    width, height = 1920, 1080
    bg = gradient_background(width, height, "#0f172a", "#1e293b")
    draw = ImageDraw.Draw(bg)

    # Patrón de líneas diagonales sutiles
    for i in range(-height, width + height, 80):
        draw.line([(i, 0), (i + height, height)], fill="#334155", width=2)

    font_title = load_font(64, bold=True)
    font_sub = load_font(28)
    font_water = load_font(20)

    draw_centered_text(draw, "JUNISAMA", font_title, height // 2 - 40, "#ffffff", width)
    draw_centered_text(
        draw,
        "Infraestructura Sanitaria Industrial · Eventos · Obras · 24/7",
        font_sub,
        height // 2 + 30,
        "#cbd5e1",
        width,
    )
    draw_centered_text(
        draw,
        "HERO BACKGROUND PENDIENTE — reemplazar por foto/video real de evento",
        font_water,
        height - 80,
        "#94a3b8",
        width,
    )

    bg.save(path, "JPEG", quality=85)
    print(f"[OK] {path}")


def generate_og_image(path):
    width, height = 1200, 630
    bg = gradient_background(width, height, "#0f172a", "#1e293b")
    draw = ImageDraw.Draw(bg)

    # Barra dorada superior
    draw.rectangle([0, 0, width, 12], fill="#f59e0b")

    font_title = load_font(72, bold=True)
    font_sub = load_font(32)
    font_water = load_font(20)

    draw_centered_text(draw, "JUNISAMA", font_title, height // 2 - 30, "#ffffff", width)
    draw_centered_text(
        draw,
        "Alquiler de baños portátiles y unidades sanitarias en Colombia",
        font_sub,
        height // 2 + 50,
        "#cbd5e1",
        width,
    )
    draw_centered_text(
        draw,
        "junisama.com.co · +57 350 708 9584",
        font_water,
        height - 60,
        "#94a3b8",
        width,
    )

    bg.save(path, "JPEG", quality=90)
    print(f"[OK] {path}")


def generate_quienes_somos_image(path, title):
    width, height = 800, 600
    bg = gradient_background(width, height, "#1e293b", "#0f172a")
    draw = ImageDraw.Draw(bg)

    draw.rounded_rectangle([40, 40, width - 40, height - 40], radius=24, outline="#334155", width=3)

    font_title = load_font(40, bold=True)
    font_water = load_font(18)

    draw_centered_text(draw, title, font_title, height // 2, "#ffffff", width)
    draw_centered_text(
        draw,
        "FOTO REAL PENDIENTE — reemplazar por imagen real antes de producción",
        font_water,
        height - 60,
        "#94a3b8",
        width,
    )

    os.makedirs(os.path.dirname(path), exist_ok=True)
    bg.save(path, "JPEG", quality=85)
    print(f"[OK] {path}")


def generate_favicon(path):
    size = 32
    img = Image.new("RGBA", (size, size), (15, 23, 42, 255))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([2, 2, size - 2, size - 2], radius=6, fill="#0ea5e9")
    font = load_font(18, bold=True)
    draw.text((size // 2, size // 2), "J", font=font, fill="#ffffff", anchor="mm")
    img.save(path, "ICO", sizes=[(16, 16), (32, 32)])
    print(f"[OK] {path}")


PRODUCTS = [
    ("bano-vip", "Baño Portátil VIP", "Unidad premium para eventos exclusivos", "#0ea5e9"),
    ("bano-estandar", "Baño Portátil Estándar", "Solución práctica para obras y eventos", "#22c55e"),
    ("discapacitados", "Baño para Discapacitados", "Accesibilidad PMR con rampa y barras", "#a855f7"),
    ("electricos", "Baños Eléctricos", "Ventilación forzada e iluminación LED", "#f59e0b"),
    ("lavamanos", "Lavamanos Portátil", "Estación de higiene con doble puesto", "#06b6d4"),
    ("trailer-lujo", "Trailer de Lujo", "Múltiples cabinas climatizadas", "#ec4899"),
    ("operarios", "Servicio de Operarios", "Personal capacitado para limpieza 24/7", "#64748b"),
    ("puntos-ecologicos", "Puntos Ecológicos", "Estaciones de reciclaje sostenibles", "#10b981"),
]

if __name__ == "__main__":
    for slug, title, subtitle, accent in PRODUCTS:
        generate_product_image(
            os.path.join(ROOT, "public", "images", "products", f"{slug}.jpg"),
            title,
            subtitle,
            accent,
        )

    generate_hero_image(os.path.join(ROOT, "public", "images", "hero-background.jpg"))
    generate_og_image(os.path.join(ROOT, "public", "images", "og-image.jpg"))
    generate_quienes_somos_image(
        os.path.join(ROOT, "public", "images", "quienes-somos", "equipo.jpg"),
        "Equipo Junisama",
    )
    generate_quienes_somos_image(
        os.path.join(ROOT, "public", "images", "quienes-somos", "servicio-tecnico.jpg"),
        "Servicio Técnico Junisama",
    )
    generate_favicon(os.path.join(ROOT, "public", "favicon.ico"))
