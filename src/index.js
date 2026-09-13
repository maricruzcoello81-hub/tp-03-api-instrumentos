const express = require("express");
const path = require("node:path");
const leerJson = require("./archivos.js");

const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "instrumentos.json");

async function main() {
  try {
    
    const instrumentos = await leerJson(rutaDatos);

    const app = express();

    
    app.use(express.json());

    // 2. Respuesta de bienvenida
    app.get("/", (req, res) => {
      res.json({ mensaje: "API de Catálogo de Instrumentos Musicales disponible" });
    });

    // Listado de todos los instrumentos 
    app.get("/api/instrumentos", (req, res) => {
      const { familia } = req.query;

      if (!familia) {
        return res.json(instrumentos);
      }

      const resultado = instrumentos.filter(
        (item) => item.familia.toLowerCase() === String(familia).toLowerCase()
      );

      // Si no hay coincidencias, responde 200
      res.json(resultado);
    });

    
    app.get("/api/instrumentos/:id", (req, res) => {
      const id = Number(req.params.id);
      const instrumento = instrumentos.find((item) => item.id === id);

      if (!instrumento) {
        return res.status(404).json({ error: "Instrumento musical no encontrado" });
      }

      res.json(instrumento);
    });

     app.post("/api/instrumentos", (req, res) => {
      const body = req.body || {};
      const { nombre, familia, origen, descripcion, disponible } = body;
     
      if (
        !nombre ||
        !familia ||
        !origen ||
        !descripcion ||
        disponible === undefined
      ) {
        return res.status(400).json({
          error: "Los campos nombre, familia, origen, descripcion y disponible son obligatorios",
        });
      }
      const ultimoId = instrumentos.length === 0 ? 0 : instrumentos[instrumentos.length - 1].id;

      const nuevoInstrumento = {
        id: ultimoId + 1,
        nombre,
        familia,
        origen,
        descripcion,
        disponible,
      };

      instrumentos.push(nuevoInstrumento);

      res.status(201).json(nuevoInstrumento);
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor de instrumentos disponible en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exitCode = 1;
  }
}

main();