const EMPTY = '';

const subgrid = new Array(3).fill().map((_,row)=>{
	return new Array(3).fill().map((_,col)=>{
		const elem = document.createElement('div');
		elem.id = `Subgrid-${row}-${col}`;
		elem.setAttribute('class', 'SudokuSubGrid');
		elem.style.gridRow = row+1;
		elem.style.gridColumn = col+1;
		SudokuGrid.appendChild(elem);
		return elem;
	});
});

function CellKeyPressedHandler(e){
	if(	e.key === 'Backspace' || 
			!'123456789'.includes(e.key) || 
			this.hasAttribute('readonly')){
		if(['Backspace','0'].includes(e.key)) this.value = '';
		e.preventDefault();
		return;
	}
	this.value = '';
	console.log(this.id);
}

const grid = new Array(9).fill().map((_,row)=>new Array(9).fill().map((_,col)=>{
	const elem = document.createElement('input');
	elem.id = `cell-${row}-${col}`;
	elem.type = 'text';
	elem.onkeydown = CellKeyPressedHandler;
	elem.style.textAlign = 'center';
	elem.style.gridRow = row%3+1;
	elem.style.gridColumn = col%3+1;
	const [sr,sc] = [row,col].map(i=>Math.floor(i/3));
	subgrid[sr][sc].appendChild(elem);
	return elem;
}));

function Possible(grid, row, col, val){
	val = `${val}`;
	// Row check
	for(let c=0;c<9;c++){
		if(c == col) continue;
		if(grid[row][c].value === val) return false;
	}
	// Column check
	for(let r=0;r<9;r++){
		if(r == row) continue;
		if(grid[r][col].value === val) return false;
	}
	// 3x3 cell check
	const [cr, cc] = [row,col].map(i=>((i/3)|0)*3);
	for(let r=cr;r<cr+3;r++){
		for(let c=cc;c<cc+3;c++){
			if(r === row && c === col) continue;
			if(grid[r][c].value === val) return false;
		}
	}
	return true;
}

async function Solve(grid){
	return new Promise((resolve,reject)=>{
	  setTimeout(async ()=>{
			for(let row=0;row<9;row++){
				for(let col=0;col<9;col++){
					const cell = grid[row][col];
					if(cell.value === EMPTY){
						for(let val=1;val<=9;val++){
							if(Possible(grid,row,col,val)){
								cell.value = val;
								await Solve(grid).catch(e=>{
									cell.value = EMPTY;
								});
							}
						}
						reject(new Error('Undo'));
					}
				}
			}
			resolve();
		},1);
	})
	.then(async done=>!done?await Solve(grid):null);
}

function Setup(grid, nclues=17){
	while(nclues > 0){
		const idx = (Math.random()*81)|0;
		const [row,col] = [(idx/9)|0,idx%9];
		const val = 1+(Math.random()*9)|0;
		if(Possible(grid, row, col, val)){
			const cell = grid[row][col];
			cell.value = val;
			cell.setAttribute('readonly','');
			nclues--;
		}
	}
}

Setup(grid, 21);
// Solve(grid).then(()=>console.log(grid));
