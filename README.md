# CSUP-Blockchain

Personal To-Do list using smart contracts

### Project Overview

The project that I have developed is intended for personal use. It uses smart contracts for creation and completion of tasks that the user has himself created. The project requires a constant internet connection to Ethereum's Blockchain. Each task that the user creates or completes , can not be altered after its' addition to the Blockchain.

The project is saved in index.html, but requires to opened trough Bash for Bootstrap to successfully work.
To open the project trough Bash, the user must first specify the directory of the project
"cd eth-todo-list"
After that is done, the user can open the project on localhost using the command
"npm run dev"

Afterwards the user must import his Ganache account trough MetaMask, which can be achieved by pressing on the 'Import Account' button on the extension. In Ganache the user can find the Private Keys from the accounts that he needs to import.


### Logical View

<img src="https://raw.githubusercontent.com/Idzo721/CSUP-Blockchain/master/Project_Connection.png" width = "500"> 


### Technology Stack

My project uses the following stack: truffle framework, Ganache, MetaMask extension, solidity programming language, Bootstrap for the front-end, JSON and JS.
Requirements for my project to run sucessfully:
Have Ganache open and running
Have MetaMask extension installed, and connected to an existing Ganache Account
