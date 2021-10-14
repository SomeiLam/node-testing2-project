const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('[GET] /cats', () => {
    let res
    beforeEach(async () => {
        res = await request(server).get('/cats')
    })
    it('responds with 200 OK', async () => {
        expect(res.status).toBe(200)
    })
    it('responds with all (4) cats', async () => {
        expect(res.body).toHaveLength(4)
    })
    it('responds with the correct data structure', async () => {
        expect(res.body).toMatchObject([
            {
                "id": 1,
                "name": "Nietzche",
                "color": "Grey"
            },
            {
                "id": 2,
                "name": "Lolita",
                "color": "Brown"
            },
            {
                "id": 3,
                "name": "Jujube",
                "color": "Black"
            },
            {
                "id": 4,
                "name": "Brownie",
                "color": "Black"
            }
        ])
    })
})

describe('[POST] /cats', () => {
    let res
    beforeEach(async () => {
        res = await request(server).post('/cats').send({ name: 'Uni', color: 'Black' })
    })
    it('responds with 201 CREATED', async () => {
        expect(res.status).toBe(201)
    })
    it('causes a cat to be added to the db', async () => {
        const cats = await db('cats')
        expect(cats).toHaveLength(5)
    })
    it('responds with the newly created cat', async () => {
        expect(res.body).toMatchObject({ name: 'Uni', color: 'Black' })
    })
})

describe('[PUT] /cats', () => {
    let res
    beforeEach(async () => {
        res = await request(server).put('/cats/4').send({ name: 'Browniebubu', color: 'Black' })
    })
    it('responds with 200 OK', async () => {
        expect(res.status).toBe(200)
    })
    it('causes a cat to be updated to the db', async () => {
        const brownie = await db('cats').where('id', 4).first()
        expect(brownie).toMatchObject({ name: 'Browniebubu', color: 'Black' })
    })
    it('responds with the updated cat', () => {
        expect(res.body).toMatchObject({ name: 'Browniebubu', color: 'Black' })
    })
})

describe('[DELETE] /cats', () => {
    let res
    beforeEach(async () => {
        res = await request(server).delete('/cats/4')
    })
    it('responds with 200 OK', () => {
        expect(res.status).toBe(200)
    })
    it('causes a cat to be removed from the db', async () => {
        const cats = await db('cats')
        expect(cats).toHaveLength(3)
    })
    it('responds with the new cats list', () => {
        expect(res.body).toHaveLength(3)
    })
})