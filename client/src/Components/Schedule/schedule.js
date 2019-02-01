import React, { Component } from 'react';
import moment from 'moment';
import { DateTime } from 'luxon'
import { Panel, Button, FormControl, Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

import './schedule.css'
import axios from 'axios';
var schedule = require('node-schedule');


export class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: '',
            time: '',
            date: '',
            show: '',
            lineup: '',
            seconds: '',
            active: '',
        }

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.secondsToTime = this.secondsToTime.bind(this);
        this.checkShow = this.checkShow.bind(this)
        this.convertDiff = this.convertDiff.bind(this)
        // this.testSchedule = this.testSchedule.bind(this)
        this.getEventInfo = this.getEventInfo.bind(this)
   
        
    }

     componentDidMount() {
    
        this.getEventInfo();
 
     }

     getEventInfo() {
        axios({
            method: 'get',
            url: `/api/event/getEvents/`,
        }).then(res => {
            console.log(res)
            this.setState({
                events: res.data
            })
        }).catch(
            err => console.log(err)
        )
    }


    //  testSchedule() {
        

    //     const bule = new schedule.RecurrenceRule();
    //     bule.minute = 56
    //     bule.day = 1
    //     bule.hour = 17
    //     bule.timezone = 'Asia/Seoul'

    //     var event = schedule.scheduleJob('52 * 17 * 1', function() {
    //         console.log('This runs every 5 minutes');
    //     });

    //     const rule = new schedule.RecurrenceRule();
    //     rule.minute = 1;
         
    //     var j = schedule.scheduleJob(rule, function(){
    //       console.log('The answer to life, the universe, and everything!');
    //     });
    //  }

    getEventInfo() {
        axios({
            method: 'get',
            url: `/api/event/getEvents/`,
        }).then(res => {
            console.log(res)
            this.setState({
                events: res.data
            }, () => this.checkShow())
        }).catch(
            err => console.log(err)
        )
    }

     checkShow(){
        const dt = DateTime.local();
        const dtzone = dt.zoneName
        const dayOfWeek = (dt.setZone('Asia/Seoul').c.day)
        const day = dt.setZone('Asia/Seoul').toLocaleString(DateTime.DATE_HUGE).slice(0,3)
        const currentTime = DateTime.local();
        let diff = 0
        
        switch(day) {
            case 'Mon': {
                this.setState({
                    show: "No Music show today",
                    lineup: "Get some sleep"
                })
            break;
            }
            case 'Tue': {
                let theShow
                let theShowEndTime
                let title = this.state.events[2].name
                let time = this.state.events[2].time
                let endTime = this.state.events[2].endtime
                let description = this.state.events[2].description
                let lineup = this.state.events[2].lineup
                let inactive = this.state.events[2].inactive
    
                const hour = parseInt(Array.from(time.toString()).map(Number)[0] + "" + Array.from(time.toString()).map(Number)[1])
                const minute = parseInt(Array.from(time.toString()).map(Number)[2] + "" + Array.from(time.toString()).map(Number)[3])
    
                const hourEnd = parseInt(Array.from(endTime.toString()).map(Number)[0] + "" + Array.from(endTime.toString()).map(Number)[1])
                const minuteEnd = parseInt(Array.from(endTime.toString()).map(Number)[2] + "" + Array.from(endTime.toString()).map(Number)[3])
    
                if(minuteEnd > 0){
                    theShowEndTime = DateTime.fromObject({hour: hourEnd, minute: minuteEnd, zone: 'Asia/Seoul'})
                }
                else {
                    theShowEndTime = DateTime.fromObject({hour: hourEnd, zone: 'Asia/Seoul'})
                }
    
                if(minute > 0){
                   theShow = DateTime.fromObject({hour: hour, minute: minute, zone: 'Asia/Seoul'})
                }
                else {
                   theShow = DateTime.fromObject({hour: hour, zone: 'Asia/Seoul'})
                }
    
               
                let theShowLocal = theShow.setZone(dtzone).toLocaleString(DateTime.DATETIME_SHORT)
    
                if(inactive == 1){
                    this.setState({
                        show: title,
                        time: "NOT AIRING TODAY",
                        active: 0,
                        description: description,
                    })
                }
    
                if( inactive == 0 && currentTime < theShow){
                    let diff = theShow.diff(currentTime, 'seconds').values.seconds
                    this.setState({
                        active: 1,
                        show: title,
                        time: theShowLocal,
                        diff: diff,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else if (currentTime > theShow && currentTime < theShowEndTime){
                    this.setState({
                        show: title,
                        time: "CURRENTLY AIRING",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
                else {
                    this.setState({
                        show: title,
                        time: "ENDED",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
            }
    
            break;
            case 'Wed':{
            let showChampion
            let showChampionEndTime
            let title = this.state.events[2].name
            let time = this.state.events[2].time
            let endTime = this.state.events[2].endtime
            let description = this.state.events[2].description
            let lineup = this.state.events[2].lineup
            let inactive = this.state.events[2].inactive

            const hour = parseInt(Array.from(time.toString()).map(Number)[0] + "" + Array.from(time.toString()).map(Number)[1])
            const minute = parseInt(Array.from(time.toString()).map(Number)[2] + "" + Array.from(time.toString()).map(Number)[3])

            const hourEnd = parseInt(Array.from(endTime.toString()).map(Number)[0] + "" + Array.from(endTime.toString()).map(Number)[1])
            const minuteEnd = parseInt(Array.from(endTime.toString()).map(Number)[2] + "" + Array.from(endTime.toString()).map(Number)[3])


            if(minuteEnd > 0){
                showChampionEndTime = DateTime.fromObject({hour: hourEnd, minute: minuteEnd, zone: 'Asia/Seoul'})
            }
            else {
                showChampionEndTime = DateTime.fromObject({hour: hourEnd, zone: 'Asia/Seoul'})
            }

            if(minute > 0){
               showChampion = DateTime.fromObject({hour: hour, minute: minute, zone: 'Asia/Seoul'})
            }
            else {
               showChampion = DateTime.fromObject({hour: hour, zone: 'Asia/Seoul'})
            }


           
            let showChampionLocal = showChampion.setZone(dtzone).toLocaleString(DateTime.DATETIME_SHORT)

            if(inactive == 1){
                this.setState({
                    show: title,
                    time: "NOT AIRING TODAY",
                    active: 0,
                    description: description,
                })
            }


            if( inactive == 0 && currentTime < showChampion){
                let diff = showChampion.diff(currentTime, 'seconds').values.seconds
                this.setState({
                    active: 1,
                    show: title,
                    time: showChampionLocal,
                    diff: diff,
                    lineup: lineup,
                    description: description
                }, () => this.secondsToTime())
            }
            else if (currentTime > showChampion && currentTime < showChampionEndTime){
                this.setState({
                    show: title,
                    time: "CURRENTLY AIRING",
                    active: 0,
                    lineup: lineup,
                }, () => this.secondsToTime())
            }
            else {
                this.setState({
                    show: title,
                    time: "ENDED",
                    active: 0,
                    lineup: lineup,
                }, () => this.secondsToTime())
            }
           
            break;
            }
            case 'Thu': {
                let mCountdown
                let mCountdownEndTime
                let title = this.state.events[3].name
                let time = this.state.events[3].time
                let endTime = this.state.events[3].endtime
                let description = this.state.events[3].description
                let lineup = this.state.events[3].lineup
                let inactive = this.state.events[3].inactive
    
                const hour = parseInt(Array.from(time.toString()).map(Number)[0] + "" + Array.from(time.toString()).map(Number)[1])
                const minute = parseInt(Array.from(time.toString()).map(Number)[2] + "" + Array.from(time.toString()).map(Number)[3])
    
                const hourEnd = parseInt(Array.from(endTime.toString()).map(Number)[0] + "" + Array.from(endTime.toString()).map(Number)[1])
                const minuteEnd = parseInt(Array.from(endTime.toString()).map(Number)[2] + "" + Array.from(endTime.toString()).map(Number)[3])
    
                if(minuteEnd > 0){
                    mCountdownEndTime = DateTime.fromObject({hour: hourEnd, minute: minuteEnd, zone: 'Asia/Seoul'})
                }
                else {
                    mCountdownEndTime = DateTime.fromObject({hour: hourEnd, zone: 'Asia/Seoul'})
                }
    
                if(minute > 0){
                   mCountdown = DateTime.fromObject({hour: hour, minute: minute, zone: 'Asia/Seoul'})
                }
                else {
                   mCountdown = DateTime.fromObject({hour: hour, zone: 'Asia/Seoul'})
                }
    
               
                let mCountdownLocal = mCountdown.setZone(dtzone).toLocaleString(DateTime.DATETIME_SHORT)
    
                if(inactive == 1){
                    this.setState({
                        show: title,
                        time: "NOT AIRING TODAY",
                        active: 0,
                        description: description,
                    })
                }
    
                if( inactive == 0 && currentTime < mCountdown){
                    let diff = mCountdown.diff(currentTime, 'seconds').values.seconds
                    this.setState({
                        active: 1,
                        show: title,
                        time: mCountdownLocal,
                        diff: diff,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else if (currentTime > mCountdown && currentTime < mCountdownEndTime){
                    this.setState({
                        show: title,
                        time: "CURRENTLY AIRING",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
                else {
                    this.setState({
                        show: title,
                        time: "ENDED",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
    
        }
            case 'Fri': {
                let musicBank
                let musicBankEndTime
                let title = this.state.events[4].name
                let time = this.state.events[4].time
                let endTime = this.state.events[4].endtime
                let description = this.state.events[4].description
                let lineup = this.state.events[4].lineup
                let inactive = this.state.events[4].inactive
    
                const hour = parseInt(Array.from(time.toString()).map(Number)[0] + "" + Array.from(time.toString()).map(Number)[1])
                const minute = parseInt(Array.from(time.toString()).map(Number)[2] + "" + Array.from(time.toString()).map(Number)[3])
    
                const hourEnd = parseInt(Array.from(endTime.toString()).map(Number)[0] + "" + Array.from(endTime.toString()).map(Number)[1])
                const minuteEnd = parseInt(Array.from(endTime.toString()).map(Number)[2] + "" + Array.from(endTime.toString()).map(Number)[3])
    
                if(minuteEnd > 0){
                    musicBankEndTime = DateTime.fromObject({hour: hourEnd, minute: minuteEnd, zone: 'Asia/Seoul'})
                }
                else {
                    musicBankEndTime = DateTime.fromObject({hour: hourEnd, zone: 'Asia/Seoul'})
                }
    
                if(minute > 0){
                   musicBank = DateTime.fromObject({hour: hour, minute: minute, zone: 'Asia/Seoul'})
                }
                else {
                   musicBank = DateTime.fromObject({hour: hour, zone: 'Asia/Seoul'})
                }
    
               
                let musicBankLocal = musicBank.setZone(dtzone).toLocaleString(DateTime.DATETIME_SHORT)
    
                if(inactive == 1){
                    this.setState({
                        show: title,
                        time: "NOT AIRING TODAY",
                        active: 0,
                        description: description,
                    })
                }
    
                if( inactive == 0 && currentTime < musicBank){
                    let diff = musicBank.diff(currentTime, 'seconds').values.seconds
                    this.setState({
                        active: 1,
                        show: title,
                        time: musicBankLocal,
                        diff: diff,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else if (currentTime > musicBank && currentTime < musicBankEndTime){
                    this.setState({
                        show: title,
                        time: "CURRENTLY AIRING",
                        active: 0,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else {
                    this.setState({
                        show: title,
                        time: "ENDED",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
    
    
               
                break;
            }
            case 'Sat': {
                let musicCore
                let musicCoreEndTime
                let title = this.state.events[5].name
                let time = this.state.events[5].time
                let endTime = this.state.events[5].endtime
                let description = this.state.events[5].description
                let lineup = this.state.events[5].lineup
                let inactive = this.state.events[5].inactive
    
                const hour = parseInt(Array.from(time.toString()).map(Number)[0] + "" + Array.from(time.toString()).map(Number)[1])
                const minute = parseInt(Array.from(time.toString()).map(Number)[2] + "" + Array.from(time.toString()).map(Number)[3])
    
                const hourEnd = parseInt(Array.from(endTime.toString()).map(Number)[0] + "" + Array.from(endTime.toString()).map(Number)[1])
                const minuteEnd = parseInt(Array.from(endTime.toString()).map(Number)[2] + "" + Array.from(endTime.toString()).map(Number)[3])
    
                if(minuteEnd > 0){
                    musicCoreEndTime = DateTime.fromObject({hour: hourEnd, minute: minuteEnd, zone: 'Asia/Seoul'})
                }
                else {
                    musicCoreEndTime = DateTime.fromObject({hour: hourEnd, zone: 'Asia/Seoul'})
                }
    
                if(minute > 0){
                   musicCore = DateTime.fromObject({hour: hour, minute: minute, zone: 'Asia/Seoul'})
                }
                else {
                   musicCore = DateTime.fromObject({hour: hour, zone: 'Asia/Seoul'})
                }
    
               
                let musicCoreLocal = musicCore.setZone(dtzone).toLocaleString(DateTime.DATETIME_SHORT)
    
                if(inactive == 1){
                    this.setState({
                        show: title,
                        time: "NOT AIRING TODAY",
                        active: 0,
                        description: description,
                    })
                }
    
                if( inactive == 0 && currentTime < musicCore){
                    let diff = musicCore.diff(currentTime, 'seconds').values.seconds
                    this.setState({
                        active: 1,
                        show: title,
                        time: musicCoreLocal,
                        diff: diff,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else if (currentTime > musicCore && currentTime < musicCoreEndTime){
                    this.setState({
                        show: title,
                        time: "CURRENTLY AIRING",
                        active: 0,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else {
                    this.setState({
                        show: title,
                        time: "ENDED",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
           
            break;
            }
            case 'Sun': {
                let sbsInkigayo
                let sbsInkigayoEndTime
                let title = this.state.events[0].name
                let time = this.state.events[0].time
                let endTime = this.state.events[0].endtime
                let description = this.state.events[0].description
                let lineup = this.state.events[0].lineup
                let inactive = this.state.events[0].inactive
    
                const hour = parseInt(Array.from(time.toString()).map(Number)[0] + "" + Array.from(time.toString()).map(Number)[1])
                const minute = parseInt(Array.from(time.toString()).map(Number)[2] + "" + Array.from(time.toString()).map(Number)[3])
    
                const hourEnd = parseInt(Array.from(endTime.toString()).map(Number)[0] + "" + Array.from(endTime.toString()).map(Number)[1])
                const minuteEnd = parseInt(Array.from(endTime.toString()).map(Number)[2] + "" + Array.from(endTime.toString()).map(Number)[3])
    
                if(minuteEnd > 0){
                    sbsInkigayoEndTime = DateTime.fromObject({hour: hourEnd, minute: minuteEnd, zone: 'Asia/Seoul'})
                }
                else {
                    sbsInkigayoEndTime = DateTime.fromObject({hour: hourEnd, zone: 'Asia/Seoul'})
                }
    
                if(minute > 0){
                   sbsInkigayo = DateTime.fromObject({hour: hour, minute: minute, zone: 'Asia/Seoul'})
                }
                else {
                   sbsInkigayo = DateTime.fromObject({hour: hour, zone: 'Asia/Seoul'})
                }
    
               
                let sbsInkigayoLocal = sbsInkigayo.setZone(dtzone).toLocaleString(DateTime.DATETIME_SHORT)
    
                if(inactive == 1){
                    this.setState({
                        show: title,
                        time: "NOT AIRING TODAY",
                        active: 0,
                        description: description,
                    })
                }
    
                if( inactive == 0 && currentTime < sbsInkigayo){
                    let diff = sbsInkigayo.diff(currentTime, 'seconds').values.seconds
                    this.setState({
                        active: 1,
                        show: title,
                        time: sbsInkigayoLocal,
                        diff: diff,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else if (currentTime > sbsInkigayo && currentTime < sbsInkigayoEndTime){
                    this.setState({
                        show: title,
                        time: "CURRENTLY AIRING",
                        active: 0,
                        lineup: lineup,
                        description: description
                    }, () => this.secondsToTime())
                }
                else {
                    this.setState({
                        show: title,
                        time: "ENDED",
                        active: 0,
                        lineup: lineup,
                    }, () => this.secondsToTime())
                }
    
    
            break;
        }
        }
     }


     secondsToTime(){
        const secs = this.state.diff 

        if(secs > 0){

            const hours = Math.floor(secs / (60 * 60));
 
    
            let divisor_for_minutes = secs % (60 * 60);
            const minutes = Math.floor(divisor_for_minutes / 60);
        
            let divisor_for_seconds = divisor_for_minutes % 60;
            const seconds = Math.ceil(divisor_for_seconds);
        
            this.setState({
                h: hours,
                m: minutes,
                s: seconds,
            });
            this.startTimer()
        }
      }

      startTimer() {
        if (this.state.diff > 0) {
          setInterval(this.countDown, 1000);
        }
      }

      countDown() {
        // Remove one second, set state so a re-render happens.
        let difference = this.state.diff - 1
        this.setState({
            diff: difference
        });
        this.convertDiff();
        
      }

      convertDiff(){
        const secs = this.state.diff 

        if(secs > 0){

            const hours = Math.floor(secs / (60 * 60));
 
    
            let divisor_for_minutes = secs % (60 * 60);
            const minutes = Math.floor(divisor_for_minutes / 60);
        
            let divisor_for_seconds = divisor_for_minutes % 60;
            const seconds = Math.ceil(divisor_for_seconds);
        
            this.setState({
                h: hours,
                m: minutes,
                s: seconds,
            });
    
        }
        else {
            window.location.reload();
        }
      }


    
    render(){
        return(
            <div className="schedule-body">
                <div className="date-text">
                    <div className='show'>
                        <a data-tip data-for='description'>{this.state.show}</a>
                        <ReactTooltip id='description' className='extraClass'  place="right" type="dark" effect="solid">
                            <span id='description-span'>{this.state.description}</span>
                        </ReactTooltip>
                        
                        
                    </div>
                    {this.state.active == 1 && <div className='countdown'>{this.state.h}:{this.state.m}:{this.state.s}</div>}
                    <div className='clock'>{this.state.time}</div>
                    <div className='lineup'>ft. {this.state.lineup}</div>
                </div>
            </div>
        )
    }
}