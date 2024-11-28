const TDU = require('../models/tdu');

exports.createTDU = async (req, res) => {
    try {
        const newTDU = await TDU.create(req.body);
        res.status(201).json(newTDU);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTDUs = async (req, res) => {
    try {
        const tdus = await TDU.findAll();
        res.status(200).json(tdus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtiene un registro específico de TDU por su ID
exports.getTDUById = async (req, res) => {
    try {
        const id = req.params.id;
        const tdu = await TDU.findByPk(id); // Encuentra el TDU por su clave primaria

        if (tdu) {
            res.status(200).json(tdu);
        } else {
            res.status(404).json({ message: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener registros de CDU filtrados por id_tdu e incluir una secuencia
exports.getCDUsByTDUWithSequence = async (req, res) => {
    try {
        const { id_tdu } = req.params;
        
        // Encuentra todos los registros de CDU que coincidan con el id_tdu
        const cdus = await CDU.findAll({
            where: { id_tdu },
            order: [['createdAt', 'ASC']], // Ordena los registros, si es necesario
        });

        // Agrega una secuencia (número de índice) a cada registro
        const cdusWithSequence = cdus.map((cdu, index) => ({
            sequence: index + 1,
            ...cdu.toJSON(),
        }));

        res.status(200).json(cdusWithSequence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTDU = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await TDU.update(req.body, { where: { id } });
        updated ? res.status(200).json({ message: "TDU updated" }) : res.status(404).json({ error: "TDU not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTDU = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TDU.destroy({ where: { id } });
        deleted ? res.status(200).json({ message: "TDU deleted" }) : res.status(404).json({ error: "TDU not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
