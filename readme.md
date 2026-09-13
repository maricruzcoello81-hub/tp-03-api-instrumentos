# Trabajo práctico 03 
## Descripción
API HTTP que administra de lista ed instrumentos musicales en memoria, aplicando lectura asíncrona de archivos JSON, manejo de rutas, parámetros de ruta, consultas  y validaciones de cuerpos JSON.

## Instalación
Para instalar las dependencias necesarias del proyecto, se ejectura:

npm install

## ejecución

npm start
## Endpoints
GET: Bienvenida general a la API.

GET /api/instrumentos: Listado completo de instrumentos o filtrado opcional mediante consulta (familia).

GET /api/instrumentos/:id: Detalle de un instrumento específico según su identificador numérico de ruta.

POST /api/instrumentos: Registro de un nuevo instrumento en memoria.
## ejemplo de solicitudes

1. Bienvenida: GET / — Solicita la raíz de la API.

2. GET /api/instrumentos — Solicita todos los registros de la colección.
3. GET /api/instrumentos?familia=viento — Filtra registros que coincidan con la familia seleccionada.

## Codigo de estado

201 Created: Instrumento creado con éxito mediante POST.

400 Bad Request: Faltan datos obligatorios en la petición de creación.

404 Not Found: El ID buscado no existe en el catálogo.

## persistenciaa de los datos
express.json(): Middleware que procesa los datos JSON que envía el cliente (req.body).

Parámetros: Los de ruta (req.params) buscan un recurso específico, y los de consulta (req.query) filtran colecciones opcionalmente.

Memoria vs. Disco: Los nuevos instrumentos por POST se guardan solo en la memoria RAM de forma temporalal reiniciar el servidor, se pierden y se vuelve a leer el archivo original.