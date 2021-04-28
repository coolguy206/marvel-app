import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export class SearchBar extends React.Component {
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
        <div id="search-bar">
          <FontAwesomeIcon icon={faTimesCircle} size="3x" />

          <select>
            <option value="characters">characters</option>
            <option value="comics">comics</option>
            <option value="events">events</option>
            <option value="series">series</option>
            <option value="stories">stories</option>
            <option value="creators">creators</option>
          </select>
          <input type="text" placeholder="Search" />
        </div>
      </React.Fragment>
    )
  }
}
