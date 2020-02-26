var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){
    var electionInstance;

    // Nous testons qu'il y a exactement deux candidats
    it("S'initialise avec deux candidats", function() {
        return Election.deployed().then(function(instance) {
            return instance.decompteCandidats();
        }).then(function(count){
            assert.equal(count, 2);
        });
    });

    // Nous testons que les candidats sont définies avec les bonnes valeurs
    it("Initialise les candidats avec les bonnes valeurs", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidats(1);
        }).then(function(candidat) {
            assert.equal(candidat[0], 1, "contient le correct ID");
            assert.equal(candidat[1], "Candidat 1", "contient le nom correct");
            assert.equal(candidat[2], 0, "contient le nombre correct de votes");
            return electionInstance.candidats(2);
        }).then(function(candidat) {
            assert.equal(candidat[0], 2, "contient le correct ID");
            assert.equal(candidat[1], "Candidat 2", "contient le nom correct");
            assert.equal(candidat[2], 0, "contient le nombre correct de votes");
        });
    });
});