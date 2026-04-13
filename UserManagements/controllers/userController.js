const User = require("../models/users");

// --- User Controller ---
// Memanggil semua user data
exports.getAllUsers = async (req, res) => {
    try {
        // Menangkap query parameters untuk pencarian, pengurutan, dan urutan
        const { search, sort_by, order } = req.query;

        // Membangun query pencarian jika parameter search ada
        let query = {};
        if (search) {
            query = {
                $or: [
                    { username: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            };
        }

        //Membangun objek sort berdasarkan parameter sort_by dan order
        let sortObj = { createdAt: -1 };
        if (sort_by) {
            const sortOrder = order && order.toUpperCase() === 'ASC' ? 1 : -1;
            sortObj = { [sort_by]: sortOrder };
        }

        const users = await User.find(query).sort(sortObj);

        res.json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

// Menangkap user data berdasarkan id
exports.getUserById = async (req, res) => {
    try {
        // Mencari user berdasarkan ID yang diberikan dalam parameter URL
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        res.json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message
        });
    }
};

// Membuat user baru
exports.createUser = async (req, res) => {
    try {
        // Menangkap data yang dikirim melalui body request
        const { username, email, password, is_active } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email, and password are required"
            });
        }

        const user = await User.create({
            username,
            email,
            password,
            is_active: is_active !== undefined ? is_active : true
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.error("Error creating user:", error);
        
        // Menangani error validasi dari Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: Object.values(error.errors).map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
};


// Memperbarui data user berdasarkan id
exports.updateUser = async (req, res) => {
    try {
        // Mencari user berdasarkan ID yang diberikan dalam parameter URL
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Menangkap data yang dikirim melalui body request
        const { username, email, password, is_active } = req.body;
        
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;
        if (is_active !== undefined) user.is_active = is_active;

        await user.save();

        res.json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: Object.values(error.errors).map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
};

// Menghapus user berdasarkan id
exports.deleteUser = async (req, res) => {
    try {
        // Mencari user berdasarkan ID yang diberikan dalam parameter URL dan menghapusnya
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};