import React, { useState } from 'react';
import {
  FiHome,
  FiGlobe,
  FiBookOpen,
  FiEdit,
  FiBookmark,
  FiRefreshCw,
  FiMoreVertical,
  FiChevronDown,
  FiSettings,
  FiHelpCircle,
  FiChevronRight,
  FiBell,
  FiSidebar
} from 'react-icons/fi';



import  '../Sidebar.css';

const Sidebar = ()=>{

    const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const FiHomeIcon = FiHome as React.ComponentType<{ className?: string }>;
  const FiGlobeIcon = FiGlobe as React.ComponentType<{ className?: string }>;
  const FiBookOpenIcon = FiBookOpen as React.ComponentType<{ className?: string }>;
  const FiEditIcon = FiEdit as React.ComponentType<{ className?: string }>;
  const FiBookmarkIcon = FiBookmark as React.ComponentType<{ className?: string }>;
  const FiRefreshCwIcon = FiRefreshCw as React.ComponentType<{ className?: string }>;
  const FiMoreVerticalIcon = FiMoreVertical as React.ComponentType<{ className?: string }>;
  const FiChevronDownIcon = FiChevronDown as React.ComponentType<{ className?: string }>;
  const FiSettingsIcon = FiSettings as React.ComponentType<{ className?: string }>;
  const FiHelpCircleIcon = FiHelpCircle as React.ComponentType<{ className?: string }>;
  const FiChevronRightIcon = FiChevronRight as React.ComponentType<{ className?: string }>;
  const FiBellIcon = FiBell as React.ComponentType<{ className?: string }>;
  const FiSidebarIcon = FiSidebar as React.ComponentType<{ className?: string }>;

    return(
  <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
     <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FiSidebarIcon />
 : <FiChevronRightIcon />}
      </div>
             <div className="logo-container">
  <img src="newLogo.png" alt="New Logo" className="logo-img" />
  {isOpen && <div className="logo-text">Vettam.AI</div>}
</div>

{isOpen && (
        <button className="new-chat">
         New Chat
        </button>
      )      }

    <div className="section">
      <h4 style={{textAlign: 'left'}}>Features</h4>
      <ul style={{paddingLeft:'20px',fontFamily:'system-ui'}}>
          <li style={{fontSize:'16px'}} ><FiHomeIcon /> {isOpen && 'Workspace'}</li>
          <li style={{fontSize:'16px'}}><FiGlobeIcon  /> {isOpen && 'Research'}</li>
          <li style={{fontSize:'16px'}} ><FiBookOpenIcon /> {isOpen && 'Translate'}</li>
          <li style={{fontSize:'16px'}} ><FiEditIcon /> {isOpen && 'Write'}</li>
        </ul>
    </div>

    <div className="sectionOne">
              {isOpen && <h4 style={{textAlign: 'left'}}>Tools</h4>}

              <ul>
<li >
  <a
    href="/editor"
    style={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color:isOpen ? "black" : "white",
      padding: "8px 12px",
      borderRadius: "6px",
      backgroundColor: isOpen ? "white" : "transparent",
      width: "80%",
      marginLeft:' 10px',
    }}
  >
    <FiEditIcon 
      className='chngeDefault'
    />
    {isOpen && "Editor"}
  </a>
</li>

          <li style={{marginTop:'5px'}}><FiBookmarkIcon className='bookChnge' /> {isOpen && 'Bookmarks'}</li>
        </ul>

    </div>
    
        <button className="chatHistory" style={{marginTop:'15px',fontSize:'medium'}}><FiRefreshCwIcon  className='refresh' /> Chat History
</button>

      {isOpen && (

    <div className="chat-historyOne">
      <h4> Today <FiChevronDownIcon  className='chevron'/></h4>
      <ul style={{paddingLeft:'40px',fontFamily:'system-ui',}}>
        <li style={{gap: '25px',textAlign:'left'}}>Lorem ipsum dolor sit amet. <FiMoreVerticalIcon />
</li>
        <li style={{textAlign:"left"}}>Lorem ipsum dolor sit amet. <FiMoreVerticalIcon /></li>
        <li style={{textDecoration: 'underline',fontSize:'large'}}>View more</li>
      </ul>
    </div>
      )}


   <div className={`sidebar-footer ${isOpen ? 'expanded' : 'collapsed'}`}>
  <div className="team-avatars">
    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" />
    <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="avatar" />
    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" />
    <div className="notification">
      <FiBellIcon />
      <span className="badge">12</span>
    </div>
  </div>

  {isOpen && (
    <div className="user-row">
      <div className="user-info">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Female" className="user-avatar" />
        <span>Michael Smith</span>
      </div>
      <div className="actions">
        <FiSettingsIcon />
        <FiHelpCircleIcon />
      </div>
    </div>
  )}
</div>


  </aside>

    )
}


export default Sidebar;
