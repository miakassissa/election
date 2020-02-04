pragma solidity ^0.6.1;     // Suitable Version for running in Visual Studio Code
// pragma solidity ^0.5.16; // Suitable Version for running in the CMD

contract Election {
    // Stocker Candidat
    // Lire Candidat
    string public candidat;
    // Constructor
    constructor() public {
        candidat = "Candidat 1";
    }
}