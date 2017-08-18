import React from 'react';
import Style from './style.css';

export const sidebarActions = {
  TOGGLE_NAVIGATION: 1,
  TOGGLE_TOOLBAR: 2,
};

export default class Siderbar extends React.Component {

  render() {
    return (
      <div ref={(view) => this.sidebar = view} className={Style.sidenav}>
        <a href="#" onClick={() => this.props.onSidebarAction(sidebarActions.TOGGLE_NAVIGATION)}>Toggle navigation</a>
        <a href="#" onClick={() => this.props.onSidebarAction(sidebarActions.TOGGLE_TOOLBAR)}>Toggle toolbar</a>
      </div>
    )
  }

  componentDidUpdate() {
    const { showSidebar } = this.props;
    if (showSidebar) {
      this.sidebar.style.width = '250px';
    } else {
      this.sidebar.style.width = '0px';
    }
  }

}
