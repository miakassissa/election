// pragma solidity ^0.6.1;     // Suitable Version for running in Visual Studio Code
pragma solidity ^0.5.16; // Suitable Version for running in the CMD

contract Election {
    // Modeliser un Candidat
    struct Candidat {
        uint id;
        string nom;
        uint nbrVotes;
    }

    // Il nous faut enregistrer les comptes ayant voté
    // "address => bool" chaque adresse de compte sera associée à une valeur booléenne
    // pour déterminer si oui ou non cette adresse de compte a déjà voté
    mapping(address => bool) public electeurs;

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

    // Nous voulons cette fonction publique pour permettre
    // aux comptes externes d'y avoir directement accès plutôt que
    // de restreindre sa portée aà ce "Smart Contract"
    // Solidity nous permet aussi de spécifier des méta-données (exemple adresse du
    // compte exécutant la fonction, valeur qu'on récupère à partir de "msg.sender") en plus
    // du paramètre requis "_idCandidat" pour notre cas.
    function vote(uint _idCandidat) public {
        // S'assurer que l'électeur n'a pas déjà voté avant
        // Nous utilisons pour ce faire, la fonciton "require()"
        // de Solidity qui reçoit une condition et arrête l'exécution
        // du code si cette condition n'est pas vérifiée (VRAI)
        // -- Retourne FAUX, si msg.sender avait déjà voté (est présent dans le mapping "electeurs")
        require(!electeurs[msg.sender]);

        // S'assurer que le candidat à voter est un candidat valide
        // Il n'y en a que deux et on ne souhaite pas permettre un vote
        // Pour un candidat avec un ID 90 par exemple!
        require(_idCandidat > 0 && _idCandidat <= decompteCandidats);

        // "msg.sender" nous permet d'accéder au compte (adresse) qui
        // exécute cette fonction (le compte qui vote)
        // Se souvenir que cet électeur a bel et bien déjà voté une fois pour toute
        electeurs[msg.sender] = true;

        // Mettre à jour le nombre de votes reçu par le candidat
        candidats[_idCandidat].nbrVotes++;
    }
}