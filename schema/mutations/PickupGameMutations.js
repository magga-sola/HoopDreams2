module.exports = `
    createPickupGame(input: PickupGameInput): PickupGame!
    removePickupGame(id: ID!): Boolean!
    addPlayerToPickupGame(input: PlayerInput): Player!
    removePlayerFromPickupGame(id: ID!): Boolean!

`;
