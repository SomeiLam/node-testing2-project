const db = require('../../data/dbConfig')
const Cats = require('./cats-model')

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

test('environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('Cats.get()', () => {
    let cats
    beforeEach(async () => {
        cats = await Cats.getAll()
    })
    it('returns all (4) cats', async () => {
        expect(cats).toHaveLength(4)
    })
    it('cats returned are of the correct shape', async () => {
        expect(cats).toMatchObject([
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

describe('Cats.getById(id)', () => {
    it('gets the correct cat by its id', async () => {
        const nietzche = await Cats.getById(1)
        expect(nietzche).toMatchObject({ name: 'Nietzche', color: 'Grey' })
        const lolita = await Cats.getById(2)
        expect(lolita).toMatchObject({ name: 'Lolita', color: 'Brown' })
    })
})

describe('Cats.add(cat)', () => {
    it('adding a cat causes 5 cats to exist in db', async () => {
        await Cats.add({ name: 'Uni', color: 'Black' })
        const cats = await db('cats')
        expect(cats).toHaveLength(5)
    })
    it('adding a cat resolves to the new cat', async () => {
        const newCat = await Cats.add({ name: 'Uni', color: 'Black' })
        expect(newCat).toMatchObject({ name: 'Uni', color: 'Black' })
    })
})

describe('Cats.update(cat)', () => {
    it('update the cat with its id', async () => {
        const brownie = await Cats.update(4, { name: 'Browniebubu', color: 'Black' })
        expect(brownie).toMatchObject({ name: 'Browniebubu', color: 'Black' })
    })
    it('update the cat in the db', async () => {
        await Cats.update(4, { name: 'Browniebubu', color: 'Black' })
        const cats = await Cats.getAll()
        expect(cats[3]).toMatchObject({ name: 'Browniebubu', color: 'Black' })
    })
})

describe('Cats.remove(id)', () => {
    it('remove the cat from the db', async () => {
        await Cats.remove(4)
        const cats = await Cats.getAll()
        expect(cats).toHaveLength(3)
    })
})

