#include <iostream>
#include <sstream>

using namespace std;

bool possible(int (&)[9][9],int,int,int);
void solve(int (&)[9][9]);
void print(int (&)[9][9]);

int grid[9][9] = {
	0,7,0,9,0,0,0,0,1,
	0,0,0,2,5,0,0,4,0,
	5,0,0,0,0,0,8,0,7,
	0,0,0,0,0,0,0,0,5,
	9,0,8,0,6,0,3,0,0,
	0,0,5,3,0,8,0,0,2,
	0,0,0,0,0,0,0,9,0,
	0,9,6,0,4,0,0,0,0,
	0,0,4,1,0,0,0,0,3
};

bool possible(int (&grid)[9][9], int row, int col, int val){
	// Row check
	for(int i=0;i<9;i++){
		if(i == col) continue;
		if(grid[row][i] == val) return false;
	}
	// Column check
	for(int i=0;i<9;i++){
		if(i == row) continue;
		if(grid[i][col] == val) return false;
	}
	// 3x3 cells check
	int rc = (row/3)*3, cc = (col/3)*3;
	for(int r=rc;r<rc+3;r++){
		for(int c=cc;c<cc+3;c++){
			if(r == row && c == col) continue;
			if(grid[r][c] == val) return false;
		}
	}
	return true;
}

void solve(int (&grid)[9][9]){
	for(int row=0;row<9;row++){
		for(int col=0;col<9;col++){
			int& cell = grid[row][col];
			if(cell == 0){
				for(int val=1;val<=9;val++){
					if(possible(grid, row, col, val)){
						// printf("Possible at grid[%i][%i] %i", row, col, val);
						cell = val;
						// print(grid);
						solve(grid);
						cell = 0;
					}
				}
				// print(grid);
				return;
			}
		}
	}
	print(grid);
}

void print(int (&grid)[9][9]){
	for(int i=0;i<9;i++){
		for(int j=0;j<9;j++){
			stringstream ss;
			ss << char('0' + grid[i][j]);
			cout << (grid[i][j] == 0 ? " " : ss.str().c_str());
			if(j < 8) cout << ' ';
		}
		cout << '\n';
	}
	for(int i=0;i<2*9-1;i++) cout << "*";
	cout << endl;
}

int main(){
	print(grid);
	solve(grid);
}
