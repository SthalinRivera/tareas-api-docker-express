const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Base de datos en memoria
// En una aplicación real, usarías una base de datos como MongoDB, MySQL, etc.  
let tareas = [];
let nextId = 1;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Rutas CRUD

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    tarea ? res.json(tarea) : res.status(404).json({ mensaje: 'Tarea no encontrada' });
});

// Crear nueva tarea
app.post('/tareas', (req, res) => {
    const nuevaTarea = {
        id: nextId++,
        titulo: req.body.titulo,
        completado: false
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Actualizar tarea
app.put('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    tarea.titulo = req.body.titulo ?? tarea.titulo;
    tarea.completado = req.body.completado ?? tarea.completado;
    res.json(tarea);
});

// Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
    const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    const eliminada = tareas.splice(index, 1);
    res.json(eliminada[0]);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor CRUD escuchando en http://localhost:${port}`);
});
