const router = require("express").Router();
const fs = require('fs');

// GET "/api/phones/" => muestra todos los moviles
router.get("/", (req, res, next) => {

    fs.readFile('./data/phones.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo phones.json:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            // Parsea el contenido del archivo a JSON y envíalo como respuesta
            const phones = JSON.parse(data);
            res.json(phones);
        }
    })
})

// GET "/api/phones/:id" => muestra los detalles de 1 movil en concreto
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    fs.readFile('./data/phones.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo phones.json:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            const phones = JSON.parse(data);
            const phone = phones.find(phone => phone.id == id);

            if (!phone) {
                res.status(404).json({ message: 'Móvil no encontrado' });
            } else {
                res.json(phone);
            }
        }
    });
})

module.exports = router;