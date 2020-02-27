App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    return App.initWeb3();
  },

  /* Initial Code
  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },*/
  
  /*
  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
      // Si une instance web est déjà fournie par Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // On spécifie l'instance par défaut si aucune instance web3 n'a été fournie
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },
  */

  initWeb3: async function () {
    if (typeof web3 !== 'undefined') {
      // Si une instance web est déjà fournie par Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // On spécifie l'instance par défaut si aucune instance web3 n'a été fournie
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instancier un nouveau contrat Truffle depuis l'artifact
      App.contracts.Election = TruffleContract(election);
      // Connecter le fournisseur pour interagir avec le contrat
      App.contracts.Election.setProvider(App.web3Provider);
      
      return App.render();
    });
  },

  render: async function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Charger les données de comptes
    web3.eth.getAccounts(function (err, account) {      
    // web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account[0];
        $("#accountAddress").html("Votre Compte: " + account[0]);
        // console.log(account[0]);
      }
    });

    // Chargement des données de contrat
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.decompteCandidats();
    }).then(function (decompteCandidats) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for(var i=1; i <= decompteCandidats; i++) {
        electionInstance.candidats(i).then(function(candidat) {
          var id = candidat[0];
          var nom = candidat[1];
          var nbreVotes = candidat[2];

          // Rendre les résultas du candidat
          var templateCandidat = "<tr><th>" + id + "</th><td>" + nom + "</td><td>" + nbreVotes + "</td></tr>";
          candidatesResults.append(templateCandidat);
        });
      }

      loader.hide();
      content.show();

    }).catch(function(error) {
      console.warn(error);
    });
  },

  /* Code Initial
  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  }, */

  /* Initial Code
  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  // },
  
  /* Initial Code
  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  // }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
