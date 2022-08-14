import react, {useState} from 'react';
import './App.css';

function App() {
  const [highlighted, setHighlighted] = useState([]);
  const [selectedBox, setSelectedBox] = useState({row:0,col:0});
  const rows = [1,1,1,1,1,1,1,1];
  const cols = [1,1,1,1,1,1,1,1];
  function chessboard(row, col) {
    let ans = {
      left: ["top", "bottom"],
      right: ["top", "bottom"],
      top: ["left", "right"],
      bottom: ["left", "right"],
    };
	 if (col < 3) {
      delete ans.left;
    }
    if (col > 6) {
      delete ans.right;
    }
    if (row < 3) {
      delete ans.top;
    }
    if (row > 6) {
      delete ans.bottom;
    }
    if ((col<2)) {
      Object.keys(ans).forEach(item=>{
		let i = ans[item].findIndex(dir=>dir==='left');
		i>-1 &&
		ans[item].splice(i,1);
	  });
    }
	if ((row<2)) {
      Object.keys(ans).forEach(item=>{
		let i = ans[item].findIndex(dir=>dir==='top');
		i>-1 &&
		ans[item].splice(i,1);
	  });
    }

	if ((col>7)) {
      Object.keys(ans).forEach(item=>{
		let i = ans[item].findIndex(dir=>dir==='right');
		i>-1 &&
		ans[item].splice(i,1);
	  });
    }
	if ((row>7)) {
      Object.keys(ans).forEach(item=>{
		let i = ans[item].findIndex(dir=>dir==='bottom');
		i>-1 &&
		ans[item].splice(i,1);
	  });
    }
	return findPositions(ans, row, col);
  }
  function findPositions(ans, row, col) {
	let finalAns=[];
	Object.keys(ans).forEach(item=>{
		let r=row,c=col;
		switch(item){
			case 'bottom':{
				r+=2;
				break;
			}
			case 'left':{
				c-=2;
				break;
			}
			case 'right':{
				c+=2;
				break;
			}
			case 'top':{
				r-=2;
				break;
			}
		}
		ans[item].forEach(dir=>{
			let newR=r, newC=c;
			switch(dir){
				case 'bottom':{
					newR=r+1;
					break;
				}
				case 'left':{
					newC=c-1;
					break;
				}
				case 'right':{
					newC=c+1;
					break;
				}
				case 'top':{
					newR=r-1;
					break;
				}
			}
			finalAns.push({row:newR,col:newC});
		});

	});
	return finalAns;
  }

  const handleClick = (row, col) => {
    setSelectedBox({row,col})
    setHighlighted(chessboard(row, col));
  }
  return (
    <div className="App">
      {
        rows.map((row,i)=>{
          return(
            <div style={{display:'flex'}} key={i}>
              {
                cols.map((col,j)=>{
                  const isHighlighted = highlighted.filter(item=>(item.row===i+1 && item.col===j+1));
                  const isSelected= selectedBox.row===i+1 && selectedBox.col===j+1;
                  return(
                    <div key={j}
                    className={`chessboard_key ${isHighlighted.length>0?'highlighted':''} ${isSelected?'selected':''}`}
                     onClick={()=>handleClick(i+1, j+1)}>
                      {i+1},{j+1}
                    </div>
                  );
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
