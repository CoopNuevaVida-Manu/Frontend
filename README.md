# Customers Frontend

## Instrucciones

1. Descargar repositorio.
2. Ejecutar npm install.
3. Verificar la direccion ip y puerto en el que se esta ejecutando el backend en environments/environments.prod.ts y environments.ts
4. Ejecutar ng s -o para iniciar con el programa

## Despliegue a produccion 

1. Abrir una terminal en la raiz del proyecto 
2. Ejecutar ng build --prod
3. Esto creara una version compilada en frontend/dist con el mismo nombre del proyecto
4. Subir el archivo al servidor de preferencia 
5. Para desplegar el proyecto en apache2 se recomienda seguir estos pasos:
https://trellat.es/angular-en-apache/#:~:text=Para%20desplegar%20una%20aplicaci%C3%B3n%20Angular%20en%20Apache%2C%20es,peticiones%20HTTP%20que%20se%20realizan%20durante%20su%20ejecuci%C3%B3n.
