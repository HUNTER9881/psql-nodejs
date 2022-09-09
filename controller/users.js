const pool = require('../config/index');


// @description: Create new data
// @method: POST
// @api: /api/user/create
exports.createData = async (req, res, next) => {
    try {
        const { name, phone, email, isAdmin } = req.body;
        const result = await pool.query(
            `INSERT INTO users ( name, phone, email, isAdmin)  VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, phone, email, isAdmin]
        )
        res.status(201).json({ success: true, data: result.rows })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}


// @description: Get all datas
// @method: GET
// @api: /api/users/all
exports.getAll = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * from users");
        res.status(200).json({ success: true, data: result.rows })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}

// @description: Get one data
// @method: GET
// @api: /api/users/:id
exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        res.status(200).json({ success: true, data: result.rows[0] })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}


// @description: Update data
// @method: PUT
// @api: /api/users/:id
exports.updateData = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phone, email, isAdmin } = req.body;

        const oldData = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        const result = await pool.query(`
            UPDATE users SET name = $1, phone = $2, email = $3, isAdmin = $4  WHERE id = $5 RETURNING * `,
            [
                name ? name : oldData.rows[0].name,
                phone ? phone : oldData.rows[0].phone,
                email ? email : oldData.rows[0].email,
                isAdmin ? isAdmin : oldData.rows[0].isAdmin,
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
// @api: /api/users/:id
exports.deleteData = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE id = $1", [id])
        res.status(200).json({ success: true, data: [] })
    }
    catch (error) {
        res.status(400).json({ success: false, data: error.message })
    }
}