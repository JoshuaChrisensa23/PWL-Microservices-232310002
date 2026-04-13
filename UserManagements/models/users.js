'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email wajib diisi'], // Pesan error jika email tidak diisi
        unique: true, 
        maxlength: 100 
    },
    username: { 
        type: String, 
        required: [true, 'Username wajib diisi'], // Pesan error jika username tidak diisi
        unique: false,
        maxlength: 50 
    },
    password: { 
        type: String, 
        required: [true, 'Password wajib diisi'], // Pesan error jika password tidak diisi
        maxlength: 255 
    },
    is_active: { 
        type: Boolean, // Menggantikan tinyint(1)
        default: true  // Nilai default 
    }
}, {
    timestamps: true // Otomatis membuat field createdAt dan updatedAt
});

module.exports = mongoose.model('User', userSchema);