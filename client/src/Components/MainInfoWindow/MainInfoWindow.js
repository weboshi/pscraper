import React, { Component } from 'react';
import { InfoWindow } from 'react-google-maps';
import { Button, Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap';
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import './maininfowindow.css'

const styles = {
    voted: {
    backgroundColor: 'orange',
    display: 'block',
    fontSize: '4px'
    },
    unvoted: {
        display: 'block',
        fontSize: '4px'
  }
}



export class InfoWindowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          voted: '',
        }
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

        componentDidMount = () => {
         
            if (this.props.upvoters.split(',').indexOf(this.props.username) !== -1) {
              this.setState({
                voted: 'upvoted',
                id: this.props.id
              })
            }
            else if (this.props.downvoters.split(',').indexOf(this.props.username) !== -1) {
              this.setState({
                voted: 'downvoted',
                id: this.props.id
              })
            }
            else {
              this.setState({
                voted: 'novoted',
                id: this.props.id
              })
            }
        }

        upvote = () => {
            if(this.state.voted == 'upvoted'){
                this.setState({
                    voted: 'novoted'
                },
                () => this.props.upVote(this.state.id))
            }
            else {
                this.setState({
                    voted: 'upvoted'
                },
                () => this.props.upVote(this.state.id))
            }
        }
    
        downvote = () => {
            if(this.state.voted == 'downvoted'){
                this.setState({
                    voted: 'novoted'
                },
                () => this.props.downVote(this.state.id))
                
            }
            else {
                this.setState({
                    voted: 'downvoted'
                },
                () => this.props.downVote(this.props.id))
            }
        }

    render() {
        return (

                <InfoBox
                    onCloseClick={this.props.onCloseClick}>
                        <div className='info-content'>
                            <div className='info-label'>  
                            {this.state.voted == 'upvoted' ? 
                                <div className='vote-block' style={{display:'inline-block'}}>
                                    <Button bsSize='xsmall' onClick={this.upvote} style={styles.voted}><Glyphicon glyph="glyphicon glyphicon-chevron-up"/></Button>
                                    <Button bsSize='xsmall' onClick={this.downvote} style={styles.unvoted}><Glyphicon glyph="glyphicon glyphicon-chevron-down"/></Button>
                                </div>
                                :
                                this.state.voted =='downvoted' ?
                                <div className='vote-block' style={{display:'inline-block'}}>
                                    <Button bsSize='xsmall' onClick={this.upvote} style={styles.unvoted}><Glyphicon glyph="glyphicon glyphicon-chevron-up"/></Button>
                                    <Button bsSize='xsmall' onClick={this.downvote} style={styles.voted}><Glyphicon glyph="glyphicon glyphicon-chevron-down"/></Button>
                                </div>
                                :
                                <div className='vote-block' style={{display:'inline-block'}}>
                                    <Button bsSize='xsmall' onClick={this.upvote} style={styles.unvoted}><Glyphicon glyph="glyphicon glyphicon-chevron-up"/></Button>
                                    <Button bsSize='xsmall' onClick={this.downvote} style={styles.unvoted}><Glyphicon glyph="glyphicon glyphicon-chevron-down"/></Button>
                                </div>
                                } 
                                <OverlayTrigger overlay={<Tooltip id="modal-tooltip">Pinned by {this.props.markerMaker}</Tooltip>}>
                                    <a className='title-a' href="#tooltip">{this.props.title}</a>
                                </OverlayTrigger>{' '}</div>
                                
                            <div className='info-body'>
                                <p>Score: {this.props.score}</p>
                                <p>Category: {this.props.category}</p>
                                <p>Description: {this.props.description}</p>
                            </div>    
                    </div>
                </InfoBox>
       
        )
    }


}
