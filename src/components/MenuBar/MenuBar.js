import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import './MenuBar.css';
import { Layout, Menu,Row,Col,Button,Modal } from 'antd';
const finalImage = require('../../assets/images/finalImage.jpg')
function MenuBar() {
    const clrs=['black','blue'];
    const { Header, Footer } = Layout;
    const [visible,setvisible]=useState(false);//help modal
    const [visibleTwo,setvisibleTwo]=useState(false);//cheat modal
    var p;
    //functions to show/hide help modal one
    const showModal = () => {
          setvisible(true);
      }
    const handleOk = e => {
        setvisible(false);
        StartHandler();
      };
    const handleCancel = e => {
        setvisible(false);
    };



    //functions to show/hide cheat modal
    const showModalTwo = () => {
        setvisibleTwo(true);
        clearInterval(p);
    };
    const handleOkTwo = e => {
        setvisibleTwo(false);
    };
    const handleCancelTwo = e => {
        setvisibleTwo(false);
    };
    const[n,setn]=useState(5);//size of matrix
    const[ctr,setctr]=useState(0);//timer variable
    const[control,setcontrol]=useState(0);//timer function interval set
    const [matrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => 0)));//matrix

    //timer
    const tick=()=>{
        setctr(ctr=>ctr+1);
        var sum=0;
        for(var i=0;i<n;i++){
            for(var j=0;j<n;j++){
                sum+=matrix[i][j];
            }
        }
        if(sum===0){
            showModalTwo();
            clearInterval(p);
        }
    }

    //get random no between 0 and max
    const getRandomInt=(max)=> {
        return Math.floor(Math.random() * Math.floor(max));
      }

    //Buttton to handle click on start button
    const StartHandler=()=>{
        p= setInterval(tick,1000);
        for(var i=0;i<n;i++){
            matrix[getRandomInt(n)][getRandomInt(n)]=1;
        }
    }


    //function to change matrix state on hover
    const handleChange = (row, column, event) => {
        let copy = [...matrix];
        if(copy[row][column]===0)
            copy[row][column]=1;
        else
            copy[row][column]=0;
        setMatrix(copy);
      };


    //hook to check if time i.e ctr goes more than limit
    useEffect(()=>{
       if(ctr===2){
           alert("gameOver")
       }
    },[ctr]);
    //returning required components
    return (
        <Layout className="layout">
            <Row>
                    <Button onClick={()=>{
                        setMatrix(Array.from({length: n+1},()=> Array.from({length: n+1}, () => 0)));
                        setn(n+1);
                    }} >Increase Game Level</Button>
                    <Button onClick={()=>{
                            setMatrix(Array.from({length: n-1},()=> Array.from({length: n-1}, () => 0)));
                            setn(n-1);
                        }} >Decrease Game Level</Button>
                    <Button onClick={()=>{
                        setMatrix(Array.from({length: 10},()=> Array.from({length: 10}, () => 0)));
                        setn(10);
                        setctr(0);
                        clearInterval(control);
                    }} >Reset The Game</Button>
                    <Button onClick={()=>showModal()}>Start The Game</Button>
                   <h1 style={{color:'red'}}>Time : {ctr}</h1>
            </Row>
            <br/> 
            <Row>
                <Col span={24} className="site-layout-content">
                    <div className="gameArea">
                        <table className="gameTable">
                            <tbody>
                            {matrix.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                {row.map((column, columnIndex) => (
                                    <td key={columnIndex}>
                                        <Button style={{backgroundColor: clrs[matrix[rowIndex][columnIndex]]}} onMouseOver={e => {
                                            handleChange(rowIndex, columnIndex, e);                                        
                                        }}>
                                            {matrix[rowIndex][columnIndex]}
                                        </Button>
                                    </td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Col>


                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={()=>handleOk()}
                    onCancel={()=>handleCancel()}
                    >
                    <p>Goal is to Convert blue blocks to black boxes in minimum time...</p>
                    <p>The position where your mouse moves inverts the present colour of that box...</p>
                    <p>If you do this in 20 seconds at level 15 consider yourself a Genious...</p>
                </Modal>
                <Modal
                    title="YOUR IQ SCORE IS 0"
                    visible={visibleTwo}
                    onOk={()=>handleOkTwo()}
                    onCancel={()=>handleCancelTwo()}
                    >
                    <p>Chutia bnaya bada mja aaya...</p>
                    <img style={{width:'100%', height:'80%'}} src={finalImage} alt="Tu chutia h"></img>
                </Modal>
            </Row>
            <Footer style={{ textAlign: 'center' }}>Play and Test your IQ </Footer>
        </Layout>
    )
}

export default MenuBar;