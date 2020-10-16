module.exports = `
type BasketballField {
    id: ID!
    name: String!
    capacity: Int!
    yearOfCreation: Int!
    pickupGames: [PickupGame!]!
    status: BasketballFieldStatus!
}

`;