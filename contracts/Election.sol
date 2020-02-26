// pragma solidity ^0.6.1;     // Suitable Version for running in Visual Studio Code
pragma solidity ^0.5.16; // Suitable Version for running in the CMD

contract Election {
    // Modeliser un Candidat
    struct Candidat {
        uint id;
        string nom;
        uint nbrVotes;
    }

    // Stocker des Candidats
    mapping(uint => Candidat) public candidats;

    // Extraire des Candidats
    // Stocker le décompte des Candidats
    uint public decompteCandidats;

    // Constructor
    constructor() public {
        ajoutCandidat("Candidat 1");
        ajoutCandidat("Candidat 2");
    }

    function ajoutCandidat (string memory _name) private {
        decompteCandidats++;
        candidats[decompteCandidats] = Candidat(decompteCandidats, _name, 0);
    }
}