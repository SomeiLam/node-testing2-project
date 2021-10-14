const db = require('../../data/dbConfig.js')

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
}

function getAll() {
    return db('cats')
}

function getById(id) {
    return db('cats')
        .where('id', id)
        .first()
}

async function add(cat) {
    const [id] = await db('cats')
        .insert(cat)
    return getById(id)
}

async function update(id, cat) {
    await db('cats')
        .where('id', id)
        .update(cat)
    return getById(id)
}

async function remove(id) {
    await db('cats')
        .where('id', id)
        .del()
    return getAll()
}