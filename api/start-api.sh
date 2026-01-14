#!/bin/bash

VENV_NAME=".venv"
API_FILE="wsgi"
REQUIREMENTS_FILE="requirements.txt"
INSTALL_FLAG="$VENV_NAME/.installed_flag" # -- Para saber si ya se instalaron las deps
ACTIVATE_LINUX="$VENV_NAME/bin/activate"

# Definimos la ubicación del script de activación de Windows
ACTIVATE_WINDOWS="$VENV_NAME/Scripts/activate"

# --- 1. Crear y Activar Entorno Virtual ---
echo "Creando entorno virtual '$VENV_NAME'..."
# Usa 'python' para mayor compatibilidad con Windows/Git Bash
python3 -m venv $VENV_NAME

# 1.1. Intenta activar con la ruta de Windows (la más probable en un entorno Windows/Git Bash)
if [ -f "$ACTIVATE_WINDOWS" ]; then
    echo "Activando entorno en Windows..."
    source "$VENV_NAME/Scripts/activate" || . "$VENV_NAME/Scripts/activate"
elif [ -f "$ACTIVATE_LINUX" ]; then
    echo "Activando entorno en Linux/Mac..."
    source "$VENV_NAME/bin/activate"
else
    echo "No se pudo activar el entorno virtual."
    exit 1
fi

echo "--- 2. INSTALANDO DEPENDENCIAS (Solo si son necesarias) ---"

if [ -f "$REQUIREMENTS_FILE" ]; then
    if [ -f "$INSTALL_FLAG" ]; then
        echo "Dependencias de '$REQUIREMENTS_FILE' ya instaladas (saltando instalación)."
    else
        echo "Instalando dependencias desde '$REQUIREMENTS_FILE' por primera vez..."

        # Intentamos la instalación
        pip install -r $REQUIREMENTS_FILE

        if [ $? -eq 0 ]; then
            echo "Dependencias instaladas correctamente."
            # Creamos el archivo bandera para evitar la reinstalación futura
            touch $INSTALL_FLAG
        else
            echo "ERROR: Fallo al instalar las dependencias."
            rm -f $INSTALL_FLAG
            exit 1
        fi
    fi
else
    echo "ADVERTENCIA: Archivo '$REQUIREMENTS_FILE' no encontrado. Asegúrate de tener Flask instalado."
fi


# # --- 3. Establecer la aplicación Flask y Levantar el Servidor ---
# echo "Configurando y levantando el servidor Flask (Acceso externo)..."
# export FLASK_APP=wsgi.py
# flask db init
# flask db migrate -m "Initial migration"
# flask db upgrade

if [ -f "$VENV_NAME/Scripts/python.exe" ]; then
    "$VENV_NAME/Scripts/python.exe" wsgi.py
else
    "$VENV_NAME/bin/python" wsgi.py
fi
