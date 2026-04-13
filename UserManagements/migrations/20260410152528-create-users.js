'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db, client) {
    
    // Membuat collection 'users' dengan validasi schema
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'username', 'password'],
          properties: {
            email: {
              bsonType: 'string',
              description: 'Email wajib diisi dan harus berupa string'
            },
            username: {
              bsonType: 'string',
              description: 'Username wajib diisi dan harus berupa string'
            },
            password: {
              bsonType: 'string',
              description: 'Password wajib diisi dan harus berupa string'
            },
            is_active: {
              bsonType: 'bool',
              description: 'is_active harus berupa boolean'
            }
          }
        }
      }
    });

    // Membuat index untuk field email, username, password, dan is_active
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 });
    await db.collection('users').createIndex({ password: 1 });
    await db.collection('users').createIndex({ is_active: 1 });
  },
  async down(db, client) {
    await db.collection('users').drop();
  }
};