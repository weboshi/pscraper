import React from 'react';
import './home-view.scss';
import { Carousel } from 'react-bootstrap'
import Map from '../../Components/Map/map'
import { Navigation } from '../../Components/Navbar/navbar';
import { Schedule } from '../../Components/Schedule/schedule';
import { Scrape } from '../../Components/Scrape/scrape';


export default props =>

<div className='home'>
  <div className='home-body'>
      <Scrape/>
  </div>
</div>
