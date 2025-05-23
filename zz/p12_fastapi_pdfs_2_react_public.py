import os
import shutil
from pathlib import Path

os.chdir(os.path.dirname(os.path.abspath(__file__)))

origen = '/home/pk/Desktop/backend/app/routers'
destino = '../public'
destino_completo = os.path.join(destino, 'routers')

# Eliminar la carpeta de destino si existe
if os.path.exists(destino_completo):
    shutil.rmtree(destino_completo)

# Función para excluir carpetas que contienen '__' en su nombre
def exclude_folders_with_double_underscore(dir, dirs):
    return [d for d in dirs if '__'  in d]

# Copiar la carpeta completa, excluyendo carpetas con '__' en el nombre
shutil.copytree(origen, destino_completo, ignore=exclude_folders_with_double_underscore)

# Eliminar archivos que no terminen en .pdf o .xlsx
for root, dirs, files in os.walk(destino_completo):
    for file in files:
        # Si el archivo no termina en .pdf ni .xlsx, se elimina
        if not (file.endswith('_.pdf') or file.endswith('.xlsx')):
            ruta_completa = os.path.join(root, file)
            print(f'Eliminando: {ruta_completa}')
            os.remove(ruta_completa)

    # Eliminar la carpeta assets si existe
    if 'assets' in dirs:
        ruta_assets = os.path.join(root, 'assets')
        print(f'Eliminando carpeta assets: {ruta_assets}')
        shutil.rmtree(ruta_assets)
