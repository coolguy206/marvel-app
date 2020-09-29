import React from 'react';

export class Footer extends React.Component {

    render() {
    	const year = new Date().getFullYear();
      return (
        <footer className="footer">
          <span>&copy; {year}</span>
        </footer>
      );
    }

}
