#!/bin/bash

# Verificar que el script se está ejecutando en bash
if [ -z "$BASH_VERSION" ]; then
  echo "Este script debe ejecutarse en bash. Intenta ejecutarlo como: bash $0"
  exit 1
fi

# Validación inicial
if [ "$#" -ne 2 ]; then
  echo "Uso: $0 <mensaje_del_commit> <nombre_del_tag>"
  exit 1
fi

# Variables
COMMIT_MESSAGE=$1
TAG_NAME=$2
EXPECTED_BRANCH="develop"
EXPECTED_DIR="modpredel"

# Validar si estamos en el directorio correcto
CURRENT_DIR=$(basename "$(pwd)")
if [ "$CURRENT_DIR" != "$EXPECTED_DIR" ]; then
  echo "Error: Este script debe ejecutarse desde el directorio '$EXPECTED_DIR'."
  exit 1
fi

# Validar si estamos en la rama develop
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$EXPECTED_BRANCH" ]; then
  echo "Error: Debes estar en la rama '$EXPECTED_BRANCH' para ejecutar este script."
  exit 1
fi

# Paso 1: Añadir cambios
echo "Añadiendo cambios..."
git add .

# Paso 2: Crear commit
echo "Creando commit..."
git commit -m "$COMMIT_MESSAGE"

# Paso 3: Cambiar a la rama master
echo "Cambiando a la rama master..."
git checkout master || { echo "Error al cambiar a la rama master."; exit 1; }

# Paso 4: Hacer merge de develop a master
echo "Fusionando develop en master..."
git merge develop || { echo "Error al realizar el merge."; exit 1; }

# Paso 5: Crear el tag
echo "Creando el tag..."
git tag -a "$TAG_NAME" -m "$COMMIT_MESSAGE" || { echo "Error al crear el tag."; exit 1; }

# Paso 6: Hacer push a master
echo "Subiendo cambios a la rama master..."
git push origin master || { echo "Error al hacer push a master."; exit 1; }
git push origin "$TAG_NAME" || { echo "Error al hacer push del tag."; exit 1; }

# Paso 7: Volver a la rama develop
echo "Volviendo a la rama develop..."
git checkout develop || { echo "Error al cambiar de vuelta a la rama develop."; exit 1; }

echo "Automatización completada."
