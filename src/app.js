App = {
	loading: false,
	contracts: {},

	load: async () => {
		//Load
		await App.loadWeb3()
		await App.loadAcc()
		await App.loadContr()
		await App.render()
	},
	// Konektovanje MetaMasku
	 // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },
  loadAcc: async () => {
  	App.account = web3.eth.accounts[0]
  },

  loadContr: async () => {
  	const todo = await $.getJSON('ToDo.json')
  	App.contracts.ToDo = TruffleContract(todo)
  	App.contracts.ToDo.setProvider(App.web3Provider)
  	App.todo = await App.contracts.ToDo.deployed() // Za values iz Blockchaina
  },

  render: async () => {
  	// Kako  ne bi doslo do duplog renderovanja
  	if (App.loading) {
  		return
  	}

  	App.setLoading(true)

  	//Renderuje Account
  	$('#account').html(App.account)

  	await App.renderTask()

  	App.setLoading(false)
  },

  renderTask: async () =>{
  	const taskCount = await App.todo.taskCount()
  	const $taskVisual = $('.taskVisual')

  	for(var i=1; i <= taskCount; i++){
  		const task = await App.todo.tasks(i)
  		const idTask = task[0].toNumber()
  		const contentTask = task[1]
  		const compTask = task[2]


  	const $newTaskVisual = $taskVisual.clone()
  	$newTaskVisual.find('.content').html(contentTask)
  	$newTaskVisual.find('input')
  				  .prop('name',idTask)
  				  .prop('checked',compTask)
  				  .on('click', App.toggleComp)




	  	if(compTask){
	  		$('#completedTasks').append($newTaskVisual)
	  	}else{
	  		$('#Tasks').append($newTaskVisual)
	  	}

	  $newTaskVisual.show()
  	}



  },

  TaskCr: async () =>{
  	App.setLoading(true)
  	const content = $('#newTask').val()
  	await App.todo.TaskCr(content)
  	window.location.reload()
  },

  toggleComp: async (e) =>{
  	App.setLoading(true)
  	const idTask = e.target.name
  	await App.todo.toggleComp(idTask)
  	window.location.reload()
  },


  setLoading: (boolean) =>{
  	App.loading = boolean
  	const loader = $('#loader')
  	const content = $('#content')
  	if (boolean) {
  		loader.show()
  		content.hide()
  	}else{
  		loader.hide()
  		content.show()
  	}
  }

}

$(()=> {
		$(window).load(()=> {
			App.load()
		})
	})