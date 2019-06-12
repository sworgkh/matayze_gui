import React, { Component } from 'react'
import '../css/lecture.css'
import Ticker from 'react-ticker'
import logo from '../images/logo.png'
import Menu from '../components/menu'
import Clock from 'react-live-clock';
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom"

const styles= {

    container:{
        color:'white'
    },
    logo:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width:70,
        height:70
    }
}

class Lectures extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in:false,
            token:'',
            current_room:[],
            isVisible:false,
            startDate:'',
            backButton: false
        }
        this.eachLecture = this.eachLecture.bind(this)
        this.convertTime = this.convertTime.bind(this)
        this.sortTime = this.sortTime.bind(this)
    }

    componentDidMount(){
        //console.log(this.props.lectures)
        let newArray = this.state.current_room.slice()
        for(let i=0;i<this.props.lectures.length;i++)
        {
            if(this.props.room===this.props.lectures[i].room)
            {
                //console.log(this.state.current_room)
                newArray.push(this.props.lectures[i])
                this.setState({current_room:newArray}, () => this.sortTime())
            }
        }
    }
    sortTime() {
        this.state.current_room.sort(function(a,b){
            return new Date(a.startDate).getTime()  - new Date(b.startDate).getTime();
        })
        this.setState({current_room:this.state.current_room})
        //console.log(this.state.current_room)

    }

    toggleButtons = () =>{
        this.props.toggleButtons()
    }


    convertTime(start, end)
    {
        let startTime = start.split('T')
        startTime = startTime[1].split('.')
        let endTime = end.split('T')
        endTime = endTime[1].split('.')
        // console.log(this.startDate)
        return (
            <h4 style={{textAlign:'right'}}>{startTime[0]}-{endTime[0]}</h4>
        )
    }
    convertDate(start)
    {
        //console.log(start)
        let startTime = start.split('T')
        let startDate = startTime[0]
        //console.log(startDate)
        return (startDate)
    }
    eachLecture(item,i)
    {
        if(item.startDate.includes("2019-06-16"))
        {
            return(
                <div key={item.lectureID}>
                    <table className="table" style={{color:'white', width:1000 }}>
                        <tr>
                            <td>
                                <div style={{float:'left', paddingRight:10}}><img style= {{borderRadius:40, height:70, width:70}}src={item.lecturer_image} alt={"person"}/></div>
                                <div style={{float:'left',width:500, fontWeight:"bold"}}>
                                    {item.lecture}<br/>
                                    {item.lecturer}<br/>
                                </div>
                                <div  style={{float:'left',width:500}}>
                                    {item.description}
                                </div>
                            </td>
                            <td>{this.convertTime(item.startDate, item.endDate)}</td>
                        </tr>
                    </table>
                </div>
            )
        }

    }
    render()
    {
        if(this.state.backButton){
            this.toggleButtons()
            return  <Redirect  to={{
                pathname: '/halls',
                state: { logged_in: true ,authToken: this.props.token  }
            }}/>
        }



        //console.log(this.state.current_room.length)
        if(this.state.current_room.length !== 0 )
        {
            return(
                <div clasaName="container" style={styles.container}>
                    {this.state.isVisible? <Menu/> :
                        <div className="lecture">
                            <img style={styles.logo} src={logo} alt={"logo"}/>
                            <Button variant="outlined" color='primary' style={{position:'absolute', top:5,color:'white', right:10}} className="btn btn-light" onClick={() => this.setState({backButton:true})}>
                                Menu
                            </Button>
                            <div style={{margin:'0 auto', width:1000}}>
                                <h1 style={{float:'left'}}>{this.state.current_room[0].room}</h1>
                                <h1 style={{float:'left', paddingLeft:130}}>{this.state.current_room[0].conference_title}</h1>
                                <h4 style={{position:'absolute', top:5}}>{this.convertDate(this.state.current_room[0].startDate)} | {<Clock format={'HH:mm:ss'} ticking={true} timezone={'Israel'} />}</h4>
                            </div>
                            <div style={{clear:'both',margin:'0 auto',width:1000}}>
                                <Ticker>
                                    {() => (
                                        <div>
                                            {this.props.messages.map(item => (
                                                    <h1 style={{float:'left', fontSize:18}}>
                                                        {item.message} |&nbsp;</h1>
                                                )
                                            )}
                                        </div>
                                    )}
                                </Ticker>
                            </div>
                            {this.state.current_room.map(this.eachLecture)}
                        </div>


                    }
                </div>
            )
        }
        return null
    }
}

export default Lectures

