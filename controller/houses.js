const pool = require('../config/db');


// @description: Create new data
// @method: POST
// @api: /api/houses/create
exports.createData = async (req, res, next) => {
    try {
        const { price, location, address, area } = req.body;
        const result = await pool.query(
            `INSERT INTO houses ( price, location, address, area)  VALUES ($1, $2, $3, $4) RETURNING * `,
            [price, location, address, area]
        )
        res.status(201).json({ success: true, data: result.rows })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}


// @description: FIlter by address
// @method: GET
// @api: /api/houses/filter
exports.filterData = async (req, res, next) => {
    try {
        const { address } = req.query;
        const result = await pool.query(`SELECT * FROM houses WHERE address='${address}' `)
        res.status(200).json({ success: true, data: result.rows })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}

// @description: Get all datas
// @method: GET
// @api: /api/houses/all
exports.getAll = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * from houses");
        res.status(200).json({ success: true, data: result.rows })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}

// @description: Get one data
// @method: GET
// @api: /api/houses/:id
exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id])
        res.status(200).json({ success: true, data: result.rows[0] })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}


// @description: Update data
// @method: PUT
// @api: /api/houses/:id
exports.updateData = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { price, location, address, area } = req.body;

        const oldData = await pool.query("SELECT * FROM houses WHERE id = $1", [id])
        const result = await pool.query(`
            UPDATE houses SET price = $1, location = $2, address = $3, area = $4  WHERE id = $5 RETURNING * `,
            [
                price ? price : oldData.rows[0].price,
                location ? location : oldData.rows[0].location,
                address ? address : oldData.rows[0].address,
                area ? area : oldData.rows[0].area,
                id
            ])
        res.status(200).json({
            message: true,
            data: result.rows
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }
}

// @description: Delete data
// @method: DELETE
// @api: /api/houses/:id
exports.deleteData = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM houses WHERE id = $1", [id])
        res.status(200).json({ success: true, data: [] })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}

