import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import './scrape.css';

export class Scrape extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: '',
            results: '',
            resolved: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mapResults = this.mapResults.bind(this);
      }

      handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
      
        this.setState({
          [name]: value
        }, () => console.log(this.state));
        
      };

      handleSubmit = (e) => {
        const string = this.state.url.toString()
        this.setState({
          resolved: "pending"
        })
        e.preventDefault();
        axios({
          method: 'post',
          url: `/api/organization/scrape/`,
          data: {
            url: string,
          }
          }).then(res => {
            console.log(res)
            this.setState({
                results: res.data,
                resolved: "success"
          })
        }).catch(
            err => console.log(err)
        )
      }
      
      mapResults = () => {
        var array = [];
        var obj = this.state.results
        for (var entry in obj) {
          array.push({size:entry, price:obj[entry]});
        }
        console.log(array)
        return(
        array.map((element, i) => 
          <li key={i}>{element.size} - {element.price}</li>
        )
        )
      }

    render() {
      return(
        <div className='search-container'>
        <div className='search-body'>
          <div className='search'>
            <h1>Price Scraper</h1>
              <form onSubmit={this.handleSubmit}>
                <InputGroup>
                  <FormControl
                    name='url'
                    placeholder="Enter URL of Price Page to Scrape"
                    aria-label="Storage Prices Page to Scrape"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChange}
                  />
                  <InputGroup.Append>
                    <Button onClick={this.handleSubmit} variant="primary">Start</Button>
                  </InputGroup.Append>
                </InputGroup>
              </form>
            </div>
          </div>
          { this.state.resolved === 'success' && ( 
              <div className="results">
                {this.mapResults()}
              </div>
            )}
            { this.state.resolved === 'pending' && ( 
              <div className="results-pending">
                 <i style={{fontSize:'2em'}} class="fas fa-cog fa-spin"></i>
              </div>
            )}
            { this.state.resolved === 'null' && ( 
              <div className="results">

              </div>
            )}
          </div>
      )
      }
    }
    
                  
    

    

