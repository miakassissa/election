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

    // Ajoutons un test basique pour notre fonction de vote()
    it("Permet à un électeur de voter", function(){
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            idCandidat = 1;
            return electionInstance.vote(idCandidat, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "un évenement a été déclenché");
            assert.equal(receipt.logs[0].event, "evVote", "le type d'événement est correct");
            assert.equal(receipt.logs[0].args._idCandidat.toNumber(), idCandidat, "l'ID du candidat est correct");
            return electionInstance.electeurs(accounts[0]);
        }).then(function(vote_reussi) {
            assert(vote_reussi, "L'électeur a bien voté");
            return electionInstance.candidats(idCandidat);
        }).then(function(candidat) {
            var comptageVote = candidat[2];
            // On vérifie que le candidat n'a bel et bien reçu qu'un seul vote
            assert.equal(comptageVote, 1, "incrémente le nombre de votes du candidat");
        })
    });

    it("Envoie une exception pour les candidats invalides", function() {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.vote(99, {from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "Le message d'erreur doit contenur la chaine de caractère 'revert'.");
            return electionInstance.candidats(1);
        }).then(function(candidat1) {
            var comptageVote = candidat1[2];
            assert.equal(comptageVote, 1, "Le candidat 1 n'a reçu aucun vote");
            return electionInstance.candidats(2);
        }).then(function(candidat2) {
            var comptageVote = candidat2[2];
            assert.equal(comptageVote, 0, "Le candidat 2 n'a reçu aucun vote");
        });
    });

    it("Envoie un exception pour des cas de double vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            idCandidat = 2;
            electionInstance.vote(idCandidat, { from: accounts[1]});
            return electionInstance.candidats(idCandidat);
        }).then(function(candidat) {
            var comptageVote = candidat[2];
            assert.equal(comptageVote, 1, "accepte le premier vote");
            // Nouveau essai de vote
            return electionInstance.vote(idCandidat, { from: accounts[1]});
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "Le message d'erreur doit contenur la chaine de caractère 'revert'.");
            return electionInstance.candidats(1);
        }).then(function(candidat1) {
            var comptageVote = candidat1[2];
            assert.equal(comptageVote, 1, "Le candidat 1 n'a reçu aucun vote.");
            return electionInstance.candidats(2);
        }).then(function(candidat2) {
            var comptageVote = candidat2[2];
            assert.equal(comptageVote, 1, "Le candidat 2 n'a reçu aucun vote.");
        });
    });
});