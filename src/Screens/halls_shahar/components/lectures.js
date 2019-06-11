import React, { Component } from 'react'
import '../css/lecture.css'
import Messages from '../components/messages'
import logo from '../images/logo.png'

const styles= {
    
    container:{
        color:'white'
    },
    logo:{
        position:"relative",
        left:600,
        padding:10,
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
            startDate:''
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
                <div>
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
        //console.log(this.state.current_room.length)
        if(this.state.current_room.length !== 0 )
        {
        return(
            <div style={styles.container}>
                <img style={styles.logo} src={logo} alt={"logo"}/>
                <div className="lecture">
                        <h1 style={{float:'left', paddingLeft:130}}>{this.state.current_room[0].room}</h1>
                        <h1 style={{float:'left', paddingLeft:130}}>{this.state.current_room[0].conference_title}</h1>
                        <h4 style={{position:'absolute', left:970, top:90}}>{this.convertDate(this.state.current_room[0].startDate)}</h4>
                        {this.state.current_room.map(this.eachLecture)}
                </div>
            <Messages/>
            </div>
        )
        }
        return null
    }
}
export default Lectures

