const ToDo = artifacts.require("ToDo");

contract('ToDo',(accounts) => {
	before(async ()=>{
		this.todo = await ToDo.deployed()
	})
	it('Deployed',async ()=>{
		const address = await this.todo.address
		//Gleda da adresa nije prazna
		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})

	it('Listed Tasks', async ()=>{
		const taskCount = await this.todo.taskCount()
		const task = await this.todo.tasks(taskCount)
		//Gleda da li se id slaze sa Taskom
		assert.equal(task.id.toNumber(), taskCount.toNumber())
		assert.equal(task.content,'Test Task')
		assert.equal(task.completed,false)
		assert.equal(taskCount.toNumber(),1)
	})

	it('Created Tasks',async ()=>{
		const result = await this.todo.TaskCr('Newly Created Task')
		const taskCount = await this.todo.taskCount()
		assert.equal(taskCount,2)
		console.log(result)
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(),2)
		assert.equal(event.content, 'Newly Created Task')
		assert.equal(event.completed, false)
	})

	it('Task Completed',async ()=>{
		const result = await this.todo.toggleComp(1)
		const task = await this.todo.tasks(1)
		assert.equal(task.completed,true)
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(),1)
		assert.equal(event.completed, true)
	})

})