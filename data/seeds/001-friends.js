exports.seed = function (knex, Promise) {
    return knex('cats')
        .truncate()
        .then(function () {
            return knex('cats').insert([
                { name: 'Nietzche', color: 'Grey' },
                { name: 'Lolita', color: 'Brown' },
                { name: 'Jujube', color: 'Black' },
                { name: 'Brownie', color: 'Black' }
            ])
        })
}