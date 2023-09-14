const matchUserToPharmacies = require('../pharmacies/matchUserToPharmacies')

const pharmaciesEndpoints = {
    paths: {
        '/api/match-user-to-pharmacies': { // Endpoint for matching user to pharmacies
            ...matchUserToPharmacies
        }
    }
}

module.exports = pharmaciesEndpoints