var tamanho = document.getElementById("tamanho");
const resetButton = document.querySelector('#reset-btn');
let rounds = 0;

$(function tamanho(){
	var casa_selecionada = null;
	var peca_selecionada = null;
	function MontarTabuleiro(){{
        var i;
        for (i=0; i<8; i++){
            $("#tabuleiro").append("<div id='linha_"+i.toString()+"' class='linha' >");
            
            for (j=0; j<8; j++){
                var nome_casa ="casa_"+i.toString()+"_"+j.toString();
                var classe = (i%2==0?(j%2==0?"casa_branca":"casa_preta"):(j%2!=0?"casa_branca":"casa_preta"));
                $("#linha_"+i.toString()).append("<div id='"+nome_casa+"' class='casa "+classe+"' />");
            }
        }
    }}

	MontarTabuleiro();

	$(".casa").click (function addpeca() {
		$("#"+casa_selecionada).addClass("addpeca");
		
		/*if(classe == "casa_preta"){
				$("#"+nome_casa).append("<img src='peca.png' class='peca' id='"+nome_casa.replace("casa", "peca_preta")+"'/>");
			}
			else
				$("#"+nome_casa).append("<img src='' class='peca' id='"+nome_casa.replace("casa", "peca_branca")+"'/>");*/
	})


    $(".casa").click(function selecao(){
        $("#"+casa_selecionada).removeClass("casa_selecionada");
        casa_selecionada = $(this).attr("id");
        $("#"+casa_selecionada).addClass("casa_selecionada");
        $("#info_casa_selecionada").text(casa_selecionada);
		
    
        peca_selecionada = $("#"+casa_selecionada).children("img:first").attr("id");
        if(peca_selecionada==null){
            peca_selecionada = "NENHUMA PECA SELECIONADA";
        }
        $("#info_peca_selecionada").text(peca_selecionada.toString());
    });


	/*function reset() {
		if (tabuleiro === addpeca()){
			tabuleiro.innerHTML = '';
		}
		console.log("reset")
	}
	
	reset();*/

	resetButton.addEventListener('click', () => {
		rounds = 0;
	})

});





/*var model = {
	turn: "",
	whiteLeft: 0,
	blackLeft: 0,

	board: {
		rows: 0,
		columns: 0,

		selected: null, 

		positions: [],

		addWhitePieces: function(piecesPerSide) {
			model.whiteLeft = piecesPerSide;
			var remaining = piecesPerSide;
			var currentRow = 0;
			var currentColumn = 1;
			while(remaining > 0)
			{
				this.positions[currentRow][currentColumn] = new model.WhitePiece(currentRow, currentColumn);
				if(currentColumn == this.columns-1)
					currentColumn++;
				else if(currentColumn == this.columns-2)
					currentColumn += 3;
				else
					currentColumn += 2;
				if(currentColumn >= this.columns)
					currentRow++;
				currentColumn = currentColumn % this.columns;
				remaining--;
			}
		},

		addBlackPieces: function(piecesPerSide) {
			model.blackLeft = piecesPerSide;
			var remaining = piecesPerSide;
			var currentRow = this.rows-1;
			var currentColumn = this.columns-2;
			while(remaining > 0)
			{
				this.positions[currentRow][currentColumn] = new model.BlackPiece(currentRow, currentColumn);
				currentColumn-=2;
				if(currentColumn < 0)
					currentRow--;
				if(currentColumn == -1)
					currentColumn = this.columns - 2;
				else if(currentColumn == -2)
					currentColumn = this.columns - 1;
				currentColumn = currentColumn % this.columns;
				remaining--;
			}
		},

		/*initBoard: function(rows, columns, piecesPerSide){

			this.rows = rows;
			this.columns = columns;
			for(var i = 0; i < rows; i++) {
				this.positions[i] = [];
				for(var j = 0; j < columns; j++)
					this.positions[i][j] = new model.Piece(i, j);
			}

		},

		drawBoard: function() {
			while (document.querySelector("main").firstChild)
				document.querySelector("main").removeChild(document.querySelector("main").firstChild);

			board = document.querySelector("main").appendChild(document.createElement("div"));
			board.className = "board";

			var rows = this.rows;
			var columns = this.columns;

			actualRow = 0;
			actualColumn = 0;
			for (var i=0; i< rows*columns; i++) {
				isWhite = parseInt((i / columns) + i) % 2 == 0;
				cell = document.createElement("div");
				cell.setAttribute("row", actualRow);
				cell.setAttribute("column", actualColumn);
				cell.className = isWhite ? 'cell cell-white' : 'cell cell-black';
				
				board.appendChild(cell);
				actualColumn++;
				if (actualColumn >= columns) {
					actualColumn = 0;
					actualRow++;
				}
			}

			for(var i = 0; i < rows; i++) {
				for(var j = 0; j < columns; j++) {
					var cell = document.querySelectorAll('div[row="'+i+'"][column="'+j+'"]')[0];
					if(!this.positions[i][j].isEmpty()) {
						var newPiece = document.createElement('img');
						newPiece.setAttribute('src', this.positions[i][j].src)
						cell.appendChild(newPiece);
						if(this.positions[i][j].selected)
							cell.className += ' selected';
					}
					if(this.positions[i][j].highlighted) {
						cell.className += ' highlight';
						var that = this;
						var highlightedPiece = this.positions[i][j];
						cell.addEventListener('click', function() {
							that.selected.changePosition(parseInt(this.getAttribute('row')), parseInt(this.getAttribute('column')));	
							that.unselectCell();
							that.drawBoard();
						});
					} else {
						var that = this;
						cell.addEventListener('click', function(){
							that.selectCell(this.getAttribute('row'), this.getAttribute('column'));
							that.drawBoard();
						});
					}
				}
			}

			this.draw();
		},

		putInitialPieces: function (pieces) {
			var remaining = pieces;
			var currentRow = 0;
			var currentColumn = 1;
			while(remaining > 0)
			{
				this.positions[currentRow][currentColumn] = new model.WhitePiece(currentRow, currentColumn);
				remaining--;
				currentColumn += 2;
				if(currentColumn > this.columns)
					currentRow++;
				currentColumn = currentColumn % this.columns;

			}
			
		},

		draw: function () {
			for (var i in this.positions) {
				for (var j in this.positions[i]) {
					this.positions[i][j].draw();
				}
			}
		},

		selectCell: function (row, column) {
			var cell = document.querySelectorAll('div[row="'+row+'"][column="'+column+'"]')[0];
			if(this.selected != null) {
				this.selected.selected = false;
				this.clearHighlights();
			}
			this.selected = null;
			
			if(!this.positions[row][column].isEmpty() && model.turn == this.positions[row][column].color) {				
				this.selected = this.positions[row][column];
				this.selected.selected = true;
				this.selected.highlightMoves(this.selected.row, this.selected.column);
			}
			this.drawBoard();
		},

		unselectCell: function() {
			if(this.selected != null)
				this.selected.selected = false;
			this.selected = null;
			this.clearHighlights();
		},

		clearHighlights: function () {
			for(var i = 0; i < this.rows; i++)
			{
				for(var j = 0; j < this.columns; j++)
				{
					this.positions[i][j].highlighted = false;
				}
			}
		},

		isOutOfBounds: function (row, column) {
			return row >= model.board.rows || row < 0 || column >= model.board.columns || column < 0;
		}

	},

	Piece: function (row, column) {
		this.row = parseInt(row);
		this.column = parseInt(column);
		this.src = "";
		this.selected = false;
		this.highlighted = false;

		this.changePosition = function (newRow, newColumn) {
			model.board.positions[this.row][this.column] = new model.Piece(this.row, this.column);
			if (Math.abs(this.row - newRow) > 1 || Math.abs(this.row - newRow) > 1) {
				var eatenRowPos = (this.row + newRow)/2;
				var eatenColumnPos = (this.column + newColumn)/2;
				model.board.positions[eatenRowPos][eatenColumnPos] = new model.Piece(eatenRowPos, eatenColumnPos);
				if (this.color == "white") {
					model.blackLeft--;
				} else {
					model.whiteLeft--;
				}
			} 

			this.row = newRow;
			this.column = newColumn; 
			model.board.positions[this.row][this.column] = this;
		}

		this.draw = function () {
			if (this.src != "") {
				var cell = this.findCell();
				var img = document.createElement("img");
				img.src = this.src;
				cell.appendChild(img);
			}
		}
		this.highlightMove = function(row, column) {
			if(!model.board.isOutOfBounds(row, column)) {
				var cellTo = model.board.positions[row][column];
				if (cellTo.isEmpty()) {
					cellTo.highlighted = true;
					return false;
				} if (this.color == model.board.positions[row][column].color) {
					return false;
				}
				return true;
			}
		}

		this.isEmpty = function () {
			return true;
		}

		this.findCell = function () {
			return document.querySelectorAll('div[row="'+this.row+'"][column="'+this.column+'"]')[0];
		}

	},

	BlackPiece: function (row, column) {
		this.__proto__ = new model.Piece(row, column);
		this.src = 'peca.png';
		this.color = "black";

		this.highlightMoves = function (row, column) {

			if (this.highlightMove(row-1, column-1))
				this.highlightMove(row-2, column-2);

			if (this.highlightMove(row-1, column+1))
				this.highlightMove(row-2, column+2);
		}

		this.isEmpty = function () {
			return false;
		}

	},

	WhitePiece: function (row, column) {
		this.__proto__ = new model.Piece(row, column);
		this.src = 'peca.png';
		this.color = "white";

		this.highlightMoves = function (row, column) {

			if (this.highlightMove(row+1, column+1))
				this.highlightMove(row+2, column+2);

			if (this.highlightMove(row+1, column-1))
				this.highlightMove(row+2, column-2);
		}

		this.isEmpty = function () {
			return false;
		}

	},

};

var init = function() { 
	model.board.initBoard(8, 8, 12); 
	model.board.drawBoard();
}



init();*/