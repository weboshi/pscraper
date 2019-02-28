import React, { Component } from 'react';
import axios from 'axios';
import { Panel, Button, FormControl } from 'react-bootstrap';


import './admin.scss'



export class AdminPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            editEvent: false,
            thisEvent: '',
            updateSuccess: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getEventInfo = this.getEventInfo.bind(this)
        this.mapEvents = this.mapEvents.bind(this)
        this.editEvent = this.editEvent.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.updateEvent = this.updateEvent.bind(this)
    }

    componentDidMount(){
        this.getEventInfo()
    }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }


      getEventInfo() {
        axios({
            method: 'get',
            url: `/api/event/getEvents/`,
        }).then(res => {
            console.log(res)
            this.setState({
                events: [res.data]
            })
        }).catch(
            err => console.log(err)
        )
    }

      handleInputChange(event) {
        const value = event.target.value;
        const target = event.target;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      editEvent(clickedEvent, eventId, eventName, eventDescription, eventTime, eventInactive, eventLineup, eventEndtime) {
 
        this.setState({
            editEvent: !this.state.editEvent, 
            thisEvent: clickedEvent, 
            id: eventId,
            name: eventName,
            description: eventDescription,
            lineup: eventLineup,
            time: eventTime,
            inactive: eventInactive,
            endtime: eventEndtime
            
        })
    }

    cancelEdit() {
        this.setState({
            editEvent: !this.state.editEvent, 
            thisEvent: '', 
            id: ''
        })
    }

    updateEvent() {
        console.log(typeof(this.state.inactive))
        console.log(this.state)
        axios({
            method: 'put',
            url: '/api/event/update',
            data: {
                description: this.state.description,
                name: this.state.name,
                time: this.state.time,
                lineup: this.state.lineup,
                inactive: this.state.inactive,
                id: this.state.id,
                endtime: this.state.endtime
            },
        }).then(res => {
            console.log(res)
           
            if(res.status == 200){
                this.setState({
                    editEvent: false,
                    updateSuccess: this.state.thisEvent
                }, () => this.getEventInfo())
            }
        }).catch(function(error){
                console.log(error) 
            })
        }

      mapEvents() {
        const events = this.state.events[0]
        return(
                events.map((event, i) => (
                <div style={{width:"auto"}} key={i}>  
                {this.state.editEvent && this.state.thisEvent === i ? 
                <Panel key={i} style={{backgroundColor:'rgb(135, 206, 235) !important'}}>
                    <Panel.Heading>
                        <div 
                        style={{
                            display:'flex', 
                            justifyContent:'space-between',
                            alignItems:'center'}}>
                    
                                <FormControl
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder={event.name}
                                onChange={this.handleInputChange}
                                /> 
                                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                    <Button style={{marginLeft:'20px',marginRight:'10px'}} onClick={this.cancelEdit}>Cancel</Button>
                                    <Button className='update-button' onClick={this.updateEvent}>Update</Button>
                                </div>
                            </div>
                    </Panel.Heading>
     
                    <Panel.Body>    
                    <Panel.Body>      
                        <FormControl
                        name="time"
                        type="text"
                        value={this.state.time}
                        placeholder={event.time}
                        onChange={this.handleInputChange}
                        />
                    </Panel.Body>  
                    <Panel.Body>      
                        <FormControl
                        name="time"
                        type="text"
                        value={this.state.endtime}
                        placeholder={event.endtime}
                        onChange={this.handleInputChange}
                        />
                    </Panel.Body> 
                    <Panel.Body>      
                        <FormControl
                        name="lineup"
                        type="text"
                        value={this.state.lineup}
                        placeholder={event.lineup}
                        onChange={this.handleInputChange}
                        />
                    </Panel.Body>
                    <Panel.Body>      
                        <FormControl
                        name="description"
                        type="text"
                        value={this.state.description}
                        placeholder={event.description}
                        onChange={this.handleInputChange}
                        />
                    </Panel.Body>
                    <FormControl style={{paddingLeft:'15px !important',paddingRight:'15px !important'}} 
                    componentClass="select" 
                    placeholder={event.inactive.toString()} 
                    name='category' onChange={this.handleChange}>
                        <option value="0">Yes</option>
                        <option value="1">No</option>
               
                </FormControl></Panel.Body>
                    
            </Panel>
            :
            <Panel key={i} bsStyle="primary">
            <Panel.Heading>
                <div
                style={{
                    display:'flex', 
                    justifyContent:'space-between',
                    alignItems:'center'}}>
                    <span style={{fontWeight:'bold'}}>Title: {event.name}</span> <div>{this.state.updateSuccess === i && <span className="updated">Updated! <i style={{color:"rgb(0, 255, 42)"}} 
                    class="fas fa-check"></i></span>}
                    <Button onClick={() => this.editEvent(i, event.id, event.name, event.description, event.time, event.inactive, event.lineup, event.endtime)}>Edit</Button></div></div>
            </Panel.Heading>
                <Panel.Body>Start Time: {event.time}</Panel.Body>
                <Panel.Body>End Time: {event.endtime}</Panel.Body>
                <Panel.Body>Lineup: {event.lineup}</Panel.Body>
                <Panel.Body>Description: {event.description}</Panel.Body>
                <Panel.Body>Day: {event.day}</Panel.Body>
                <Panel.Body>Active: {event.inactive}</Panel.Body>
        </Panel>
                }
                </div>
                ))
        )
    }



    render(){
        return(
            <div className='form-panel'>
                {this.state.events && this.mapEvents()}
                {!this.state.events && <div>Loading Events</div>}
            </div>
        )
        }
    }
