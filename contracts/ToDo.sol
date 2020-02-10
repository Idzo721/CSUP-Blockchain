pragma solidity ^0.5.0;

contract ToDo {
	uint public taskCount = 0;

	struct Task{
		uint id;
		string content;
		bool completed;
	}


	mapping(uint => Task) public tasks;
	
	event TaskCreated(
		uint id,
		string content,
		bool completed
	);

	event TaskComp(
	uint id,
	bool completed
	);

	constructor() public {
		TaskCr("Test Task");
	}

	function TaskCr(string memory _content) public {
		taskCount ++;
		tasks[taskCount] = Task(taskCount, _content, false);
		emit TaskCreated(taskCount, _content, false);
	}

	function toggleComp(uint _id) public{
		Task memory _task = tasks[_id];
		_task.completed = !_task.completed;
		tasks[_id] = _task;
		emit TaskComp(_id, _task.completed);
	}

}