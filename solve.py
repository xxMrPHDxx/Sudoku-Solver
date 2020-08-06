
grid = [
	[0,7,0,9,0,0,0,0,1],
	[0,0,0,2,5,0,0,4,0],
	[5,0,0,0,0,0,8,0,7],
	[0,0,0,0,0,0,0,0,5],
	[9,0,8,0,6,0,3,0,0],
	[0,0,5,3,0,8,0,0,2],
	[0,0,0,0,0,0,0,9,0],
	[0,9,6,0,4,0,0,0,0],
	[0,0,4,1,0,0,0,0,3]
]

def possible(grid, row, col, val):
	# Row check
	for i in range(9):
		if i == col: continue
		if grid[row][i] == val: return False
	# Column check
	for i in range(9):
		if i == row: continue
		if grid[i][col] == val: return False
	# 3x3 cells check 
	cr, cc = [(i//3)*3 for i in [row,col]]
	for r in range(cr,cr+3):
		for c in range(cc,cc+3):
			if r == row and c == col: continue
			if grid[r][c] == val: return False
	return True

def solve(grid):
	for row in range(9):
		for col in range(9):
			if grid[row][col] == 0:
				for val in range(1,10):
					if possible(grid, row, col, val):
						grid[row][col] = val
						solve(grid)
						grid[row][col] = 0
				return
	print_board(grid)

def print_board(grid):
	print('\n'.join([
		' '.join([
			' ' if grid[r][c] == 0 else str(grid[r][c])
			for c in range(9)
		])
		for r in range(9)
	]) + '\n' + '*' * (9*2-1))

if __name__ == '__main__':
	print_board(grid)
	solve(grid)
