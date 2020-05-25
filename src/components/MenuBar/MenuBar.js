import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import './MenuBar.css';
import { Layout,Row,Col,Button,Modal } from 'antd';
const finalImage = require('../../assets/images/finalImage.jpg')
function MenuBar() {
    const clrs=['black','blue'];
    const { Footer } = Layout;
    const [visible,setvisible]=useState(true);//help modal
    const [started,setstarted]=useState(false);//help modal
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
        setctr(0);
    };
    const handleCancelTwo = e => {
        setvisibleTwo(false);
    };
    const[n,setn]=useState(7);//size of matrix
    const[ctr,setctr]=useState(0);//timer variable
    const [matrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => 0)));//matrix
    const [matrixTwo, setMatrixTwo] = useState(new Array(n));//matrix Two for column
    //timer
    const tick=()=>{
        setctr(ctr=>ctr+1);
        var sum1=0; var sum2 =0;
        var dec=1;
        for(var i=0;i<n;i++){
            sum1=0;
            sum2=0;
            for(var j=0;j<n;j++){
                sum1+=matrix[i][j];
                sum2+=matrix[j][i];
            }
            console.log(sum1+" "+sum2+" "+Math.floor(n/2) );
            if(sum1!== Math.floor(n/2) || sum2!==Math.floor(n/2)){
                dec=0;
                break;
            }
        }
        if(dec===1){
            showModalTwo();
            clearInterval(p);
        }
    }
    useEffect(()=>{
        var temp=new Array(n);
        for(var i=0;i<n;i++){
            var sum2=0;
            for(var j=0;j<n;j++){
                sum2+=matrix[j][i];
            }
            temp[i]=sum2;
        }
        setMatrixTwo(temp);
    },[matrix]);
    //get random no between 0 and max
    const getRandomInt=(max)=> {
        return Math.floor(Math.random() * Math.floor(max));
      }

    //Buttton to handle click on start button
    const StartHandler=()=>{
        setstarted(true);
        clearInterval(p);
        p= setInterval(tick,1000);
        for(var i=0;i<n;i++){
            matrix[getRandomInt(n)][getRandomInt(n)]=1;
        }
    }


    //function to change matrix state on hover
    const handleChange = (row, column, event) => {
        if(started){
            let copy = [...matrix];
            if(copy[row][column]===0)
                copy[row][column]=1;
            else
                copy[row][column]=0;
            setMatrix(copy);
        }
        else{
            showModal();
        }
        }
    //returning required components
    return (
        <Layout className="layout">
            <Row style={{textAlign:'center',display:'block'}}>
                    <Button style={{display:'inline'}} onClick={()=>{
                        setMatrix(Array.from({length: n+1},()=> Array.from({length: n+1}, () => 0)));
                        setn(n+1);
                    }} >Increase Game Level</Button>
                    <Button style={{display:'inline'}} onClick={()=>{
                            setMatrix(Array.from({length: n-1},()=> Array.from({length: n-1}, () => 0)));
                            setn(n-1);
                        }} >Decrease Game Level</Button>
                    <Button style={{display:'inline'}} onClick={()=>{
                        setMatrix(Array.from({length: 7},()=> Array.from({length: 7}, () => 0)));
                        setn(7);
                        setctr(0);
                    }} >Reset The Game</Button>
                    <Button style={{backgroundColor:'skyblue',display:'inline'}} onClick={()=>showModal()}>Start The Game</Button>
                   <br/><h1 style={{color:'red',display:'inline'}}>Time : {ctr}</h1>
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
                                <td>
                                <b style={{color:'red'}}>{row.reduce((a, b) => a + b, 0)}</b>
                                </td>
                                </tr>
                            ))}
                            <tr>
                                {matrixTwo.map((item,rowIndex)=>(
                                    <td key={rowIndex}>
                                        <b style={{color:'red'}}>{item}</b>
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>


                <Modal
                    title="Test Your IQ"
                    visible={visible}
                    onOk={()=>handleOk()}
                    onCancel={()=>handleCancel()}
                    >
                    <p>Goal is to make exactly <b>{Math.floor(n/2)} blue boxes in each row and column</b>...</p>
                    <p>The position where your <b>mouse</b> moves <b>inverts the present colour of that box from black to blue and vice versa</b>...</p>
                    <p>If you do this in 60 seconds at level 5 consider yourself a Genious...</p>
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
            <Footer style={{ textAlign: 'center' }}>Play and Test your IQ <br/>
                contact : mohit19699soni@gmail.com
            </Footer>
        </Layout>
    )
}

export default MenuBar;