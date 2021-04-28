import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';


export class UpArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.backToTop = this.backToTop.bind(this);
  }

  backToTop(e){
    window.scrollTo(0,0);
    console.log(`UpArrow.js backToTop function`);
    console.log(e);
  }

  render() {

    return (
      <React.Fragment>
        <div className="back-to-top">
          <FontAwesomeIcon icon={faArrowCircleUp} size="4x" onClick={this.backToTop} />
        </div>
      </React.Fragment>
    )
  }
}
