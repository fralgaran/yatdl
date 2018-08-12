class TaskList {

	constructor() {
		//table
		this.table = document.getElementById("task-table");
		this.buttons = document.getElementById("buttons");	

		//listOfTasks from localStorage, not implemented
		this.listOfTasks = 0;
		this.task = "";
		this.settings = {
			columns: {
				classes: "tcell",
				amount: 3
			},
			rows: {
				classes: 'trow'
			},
			removeButton: {
					classes: 'remove'
			},
			completeButton: {
				classes: 'complete'
			}
		}
		this.createTable();
		this.createButtons();
	}	

	addNewTask() {
		this.table.prepend(this.createTableRow());
	}
	createTable() {
		let i = this.listOfTasks;
		while(i--) {
			this.table.appendChild(this.createTableRow());
		}
		this.table.appendChild(this.createInputRow());
	}
	createButtons() {
		this.buttons.appendChild(this.createShowAllButton());
		this.buttons.appendChild(this.createShowOnlyOpenButton());
	}
	createShowAllButton() {
		let button = document.createElement('button');
		button.innerText = "All tasks";		
		this.setAttributes(button, {class:'btn active'});
		let _this = this
		button.addEventListener('click',function(e){
			let rows =  Array.from(_this.table.rows);
			rows.map((item) => {
			 item.style.display = "";					
			});
		});
		return button;
	}

	createShowOnlyOpenButton() {
		let button = document.createElement('button');
		button.innerText = "Only open tasks";		
		this.setAttributes(button, {class:'btn'});
		let _this = this
		button.addEventListener('click',function(e){
			let rows =  Array.from(_this.table.rows);
			rows.map((item) => {
			 (item.hasAttribute('data-complete')) ? item.style.display="none" : item.style.display = "";		
			});
		});
		return button;
	}

	createTableRow() {
		let tr = document.createElement('tr');
		this.setAttributes(tr, {class:this.settings.rows.classes});
		this.createTableCells(tr);
		return tr;
	}

	createInputRow() {
		let tr = document.createElement('tr');
		let td = this.createTableCell(3);
		td.appendChild(this.createTaskInputForm());
		tr.appendChild(td);
		return tr;
	}

	createTableCells(tr) {
		let n = this.settings.columns.amount; 
		let td;
		while (n--) {
			switch (n+1) {
				case 1:
					td = this.createTableCell();
					td.appendChild(this.createRemoveButton());
					tr.appendChild(td);
				break;
				case 2:
					td = this.createTableCell();
					td.appendChild(this.createTaskText());
					tr.appendChild(td);
				break;
				case 3:
					td = this.createTableCell();
					td.appendChild(this.createCompleteButton());
					tr.appendChild(td);
				break;
			}
		}
	}

	createTableCell(span = 0) {
		let td = document.createElement('td');
		if (span != 0) {
			let colspan = document.createAttribute('colspan');
			colspan.value = span;
			td.setAttributeNode(colspan);
		} 
		this.setAttributes(td, {class:this.settings.columns.classes});
		return td;
	}

	createCompleteButton() {
		let button = document.createElement('button');
		this.setAttributes(button, {class:this.settings.completeButton.classes});
		button.innerText = "Remove";
		button.addEventListener('click',function(e){		
			let tr = 	e.target.closest('tr');
			(tr.hasAttribute('data-complete')) ? tr.removeAttribute('data-complete') : tr.setAttribute('data-complete', true);
		});
		return button;
	}

	createRemoveButton() {
		let button = document.createElement('button');
		button.innerText = "X";		
		this.setAttributes(button, {class:this.settings.removeButton.classes});
		button.addEventListener('click',function(e){	
			e.target.closest('tr').remove();
		});
		return button;
	}

	createTaskText() {
		let span = document.createElement('span');
		span.innerText = this.task;
		return span;
	}

	createTaskInputForm(){
		let input = document.createElement('input');
		this.setAttributes(input, {id: 'task',name:'task-input', type: 'text', placeholder: 'Add new task'});
		let that = this;
		window.addEventListener('keyup' ,function (e) {	
	    var keyCode = e.keyCode || e.which;
	    if (keyCode == '13'){	
				that.task = document.getElementById('task').value;
				
				if (that.task == "") return;
				
				that.addNewTask();
				document.getElementById('task').value  = "";
			}
		});
		return input;
	}

	setAttributes(el, attr) {
		for(let key in attr){
			el.setAttribute(key, attr[key]);
		}
	}
	
} 

let App = new TaskList();


