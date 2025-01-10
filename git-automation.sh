#!/bin/bash


# Verifica si se proporcionaron los parámetros
if [ "$#" -ne 2 ]; then
  echo "Uso: $0 <mensaje_del_commit> <nombre_del_tag>"
  exit 1
fi

# Asigna parámetros a variables
COMMIT_MESSAGE=$1
TAG_NAME=$2

# Paso 1: Añadir cambios
echo "Añadiendo cambios..."
git add .

# Paso 2: Crear commit
echo "Creando commit..."
git commit -m "$COMMIT_MESSAGE"

# Paso 3: Cambiar a la rama master
echo "Cambiando a la rama master..."
git checkout master

# Paso 4: Hacer merge de develop a master
echo "Fusionando develop en master..."
git merge develop

# Paso 5: Crear el tag
echo "Creando el tag..."
git tag -a "$TAG_NAME" -m "$COMMIT_MESSAGE"

# Paso 6: Hacer push a master
echo "Subiendo cambios a la rama master..."
git push origin master
git push origin "$TAG_NAME"

# Paso 7: Volver a la rama develop
echo "Volviendo a la rama develop..."
git checkout develop

echo "Automatización completada."
