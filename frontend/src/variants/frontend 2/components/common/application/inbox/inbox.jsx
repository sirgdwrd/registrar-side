import React, { useState } from 'react';
import InboxHeader from './inboxLayout/inboxHeader'
import InboxFilter from './inboxLayout/inboxFilter'
import InboxTable from './inboxLayout/inboxTable'

const Inbox = () => {
  
  return (
    
    <>
      <InboxHeader/>
      <InboxFilter/>
      <InboxTable/>
      
    </>
    
  );
};

export default Inbox;