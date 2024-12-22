const CDU = require('../models/cdu');

exports.createCDU = async (req, res) => {
    try {
        const newCDU = await CDU.create(req.body);
        res.status(201).json(newCDU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCDUs = async (req, res) => {
    try {
        const cdus = await CDU.findAll();
        res.status(200).json(cdus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener los registros de CDU por id_tdu getCDUByIdAndTDU
exports.getCDUByIdAndTDU = async (req, res) => {
    const { id, id_tdu } = req.params; // Obtiene id_tdu e id de los parámetros de la URL
    try {
        const cdus = await CDU.findAll({
            where: { 
                id_tdu, // Filtra por id_tdu
                id      // Filtra también por id
            }
        });
        if (cdus.length > 0) {
            res.status(200).json(cdus); // Devuelve los registros encontrados
        } else {
            res.status(404).json({ message: `No se encontraron registros para id_tdu: ${id_tdu} e id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
};

// Controlador para obtener lista de registros de CDU según un id_tdu (Por ejemplo 4 tabla de paises)
exports.getCDUsByTDU = async (req, res) => {
    const { id_tdu } = req.params; // Obtiene id_tdu e id de los parámetros de la URL
    try {
        const cdus = await CDU.findAll({
            where: { 
                id_tdu // Filtra por id_tdu
            }
        });
        if (cdus.length > 0) {
            res.status(200).json(cdus); // Devuelve los registros encontrados
        } else {
            res.status(404).json({ message: `No se encontraron registros para id_tdu: ${id_tdu}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
};


// Controlador para obtener un registro de CDU según id
exports.getCDUById = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca el registro específico con el id e id_tdu
        const cdu = await CDU.findOne({
            where: { id },
        });

        if (cdu) {
            res.status(200).json(cdu);
        } else {
            res.status(404).json({ message: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un registro de CDU según id e id_tdu
exports.getCDUByIdAndTDU = async (req, res) => {
    try {
        const { id, id_tdu } = req.params;

        // Busca el registro específico con el id e id_tdu
        const cdu = await CDU.findOne({
            where: { id, id_tdu },
        });

        if (cdu) {
            res.status(200).json(cdu);
        } else {
            res.status(404).json({ message: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCDU = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await CDU.update(req.body, { where: { id } });
        updated ? res.status(200).json({ message: "CDU updated" }) : res.status(404).json({ error: "CDU not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCDU_TDU = async (req, res) => {
    try {
        const { id_tdu, id } = req.params;
        const [updated] = await CDU.update(req.body, { where: { id_tdu, id } });
        updated ? res.status(200).json({ message: "CDU updated" }) : res.status(404).json({ error: "CDU not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteCDU = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CDU.destroy({ where: { id } });
        deleted ? res.status(200).json({ message: "CDU deleted" }) : res.status(404).json({ error: "CDU not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCDU_TDU = async (req, res) => {
    try {
        const { id_tdu, id } = req.params;
        const deleted = await CDU.destroy({ where: { id_tdu, id } });
        deleted ? res.status(200).json({ message: "CDU deleted" }) : res.status(404).json({ error: "CDU not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};