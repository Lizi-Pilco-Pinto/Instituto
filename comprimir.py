from PIL import Image
import os

carpeta = "app/static/img/eventos"

for archivo in os.listdir(carpeta):
    if archivo.lower().endswith(('.jpg', '.jpeg', '.png')):
        ruta = os.path.join(carpeta, archivo)
        img = Image.open(ruta)
        
        # Redimensionar si es muy grande (máx 800px de ancho)
        if img.width > 800:
            ratio = 800 / img.width
            nuevo_tam = (800, int(img.height * ratio))
            img = img.resize(nuevo_tam, Image.LANCZOS)
        
        # Guardar con compresión
        img.save(ruta, optimize=True, quality=75)
        print(f"✓ {archivo} comprimido")