"""
Script: process_bull_frames.py
Propósito:
  1. Extraer los 8 cuadros de galope del toro desde la tira original.
  2. Eliminar el fondo blanco con antialiasing transparente de alta fidelidad.
  3. Colorear la silueta en Dorado Imperial / Golden Amber (#E0B32D) con degradado
     dorado radiante de iluminación superior (de #FCDA60 en cuernos/lomo a #BE8C00 en pezuñas).
  4. Estandarizar cada cuadro al tamaño exacto de 150x100 px.
  5. Alinear consistentemente todos los cuadros con línea de tierra uniforme (y=90)
     y centro del torso centrado (x=75) para evitar saltos.
  6. Exportar bull-1.png hasta bull-8.png y generar bull-preview.png.
"""

import os
from PIL import Image

def process_spritesheet(src_path, output_dirs):
    for d in output_dirs:
        os.makedirs(d, exist_ok=True)
    img = Image.open(src_path).convert('RGBA')
    W, H = img.size

    # Segmentos de columnas de cada toro
    segments = [
        (7, 125),     # Cuadro 1
        (133, 250),   # Cuadro 2
        (258, 376),   # Cuadro 3
        (388, 512),   # Cuadro 4 (Fase de vuelo / suspensión aérea)
        (520, 643),   # Cuadro 5
        (652, 774),   # Cuadro 6
        (780, 896),   # Cuadro 7
        (902, 1015)   # Cuadro 8
    ]

    GROUND_LINE_Y_ORIGINAL = 198
    FRAME_W = 150
    FRAME_H = 100
    TARGET_GROUND_Y = 90
    TARGET_BODY_X = 75

    # Paleta dorada imperial:
    # Lomo/Cuernos: Oro claro radiante (252, 222, 105)
    # Centro: Dorado Imperial (224, 179, 45)
    # Pezuñas: Oro profundo ámbar (190, 138, 5)
    TOP_GOLD = (252, 222, 105)
    MID_GOLD = (224, 179, 45)
    BOT_GOLD = (190, 138, 5)

    def get_gold_color(y):
        # Normalizar y entre 14 (lomo alto) y 90 (línea de tierra)
        t = max(0.0, min(1.0, (y - 14) / 76.0))
        if t < 0.5:
            factor = t / 0.5
            r = int(TOP_GOLD[0] + factor * (MID_GOLD[0] - TOP_GOLD[0]))
            g = int(TOP_GOLD[1] + factor * (MID_GOLD[1] - TOP_GOLD[1]))
            b = int(TOP_GOLD[2] + factor * (MID_GOLD[2] - TOP_GOLD[2]))
        else:
            factor = (t - 0.5) / 0.5
            r = int(MID_GOLD[0] + factor * (BOT_GOLD[0] - MID_GOLD[0]))
            g = int(MID_GOLD[1] + factor * (BOT_GOLD[1] - MID_GOLD[1]))
            b = int(MID_GOLD[2] + factor * (BOT_GOLD[2] - MID_GOLD[2]))
        return (r, g, b)

    frames = []

    for idx, (x_start, x_end) in enumerate(segments):
        torso_pixels = []
        for x in range(x_start, x_end + 1):
            for y in range(H):
                r, g, b, a = img.getpixel((x, y))
                if r < 120 and g < 120 and b < 120:
                    if 135 <= y <= 170:
                        torso_pixels.append((x, y))

        cx_torso = sum(p[0] for p in torso_pixels) / len(torso_pixels) if torso_pixels else (x_start + x_end) / 2.0

        frame = Image.new('RGBA', (FRAME_W, FRAME_H), (0, 0, 0, 0))

        dx = TARGET_BODY_X - int(round(cx_torso))
        dy = TARGET_GROUND_Y - GROUND_LINE_Y_ORIGINAL

        for x in range(x_start - 3, x_end + 4):
            if x < 0 or x >= W:
                continue
            for y in range(110, 205):
                if y < 0 or y >= H:
                    continue
                r, g, b, a = img.getpixel((x, y))
                lum = 0.299 * r + 0.587 * g + 0.114 * b

                if lum >= 245:
                    continue
                elif lum <= 30:
                    alpha = 255
                else:
                    # Antialiasing limpio
                    alpha = int(round(255 * (1.0 - (lum - 30) / (245 - 30))))

                dest_x = x + dx
                dest_y = y + dy
                if 0 <= dest_x < FRAME_W and 0 <= dest_y < FRAME_H:
                    gr, gg, gb = get_gold_color(dest_y)
                    frame.putpixel((dest_x, dest_y), (gr, gg, gb, alpha))

        frames.append(frame)

        # Guardar en todos los directorios de destino
        frame_filename = f"bull-{idx+1}.png"
        for d in output_dirs:
            frame.save(os.path.join(d, frame_filename), "PNG")
        print(f"Guardado: {frame_filename} ({FRAME_W}x{FRAME_H}) en Dorado Imperial")

    # Generar bull-preview.png con fondo oscuro de la revista para apreciar el resplandor dorado
    preview_w = FRAME_W * 8
    preview_h = FRAME_H
    # Fondo carbón oscuro taurino (#120404)
    preview = Image.new('RGBA', (preview_w, preview_h), (18, 4, 4, 255))

    # Trazar línea de tierra dorada
    for x in range(preview_w):
        preview.putpixel((x, TARGET_GROUND_Y), (224, 179, 45, 120))

    for idx, frame in enumerate(frames):
        preview.paste(frame, (idx * FRAME_W, 0), frame)

    for d in output_dirs:
        preview_path = os.path.join(d, "bull-preview.png")
        preview.save(preview_path, "PNG")
        print(f"Guardada previsualización: {preview_path}")

    print("Procesamiento en Dorado Imperial completado!")

if __name__ == '__main__':
    src = r'C:\Users\sukri\.gemini\antigravity-ide\brain\bcb74113-0c65-4934-b831-8fa5e9da5170\.user_uploaded\media_1791732356393.png'
    dirs = [
        r'd:\projects\El-Legado-del-Toro\sections\historia\images\bull',
        r'd:\projects\El-Legado-del-Toro\images\bull'
    ]
    process_spritesheet(src, dirs)
