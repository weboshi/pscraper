import React from 'react';
import './admin-view.scss';
import { AdminPanel } from '../../Components/Admin/admin';


export default props =>

<div className='admin'>
  <div className='admin-body'>
    <div className='admin-header'><h1>Admin</h1></div>
      <AdminPanel/>

  </div>
</div>
