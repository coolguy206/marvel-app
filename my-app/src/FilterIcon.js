import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAlphaDownAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

export class FilterIcon extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
  }

  open(e) {
    // console.log(`open`);
    document.getElementsByClassName('filter-container')[0].style.display = "flex";
  }

  close(e) {
    // console.log(`close`);
    document.getElementsByClassName('filter-container')[0].style.display = "none";
  }

  changeIcon(e, $this, str, func){
    // console.log(`changeIcon`);
    // console.log(this.props.data);
    // console.log(this.props.cat);
    // console.log(this.props.$this);
    // console.log(str);
    // console.log(e.target);

    //hide the checked boxes
    document.getElementsByClassName('fa-check-square')[0].style.display = "none";
    document.getElementsByClassName('fa-check-square')[1].style.display = "none";

    //show the unchecked boxes
    document.getElementsByClassName('fa-square')[0].style.display = "block";
    document.getElementsByClassName('fa-square')[1].style.display = "block";

    //if clicked path instead of svg & hide unchecked box then show checked box
    if(e.target.tagName == 'path'){
      e.target.parentNode.style.display = "none";
    } else {
      e.target.style.display = "none";
    }
    e.target.previousSibling.style.display = "block";

    var arr = this.props.data;
    //sort the data state
    switch(this.props.cat){
      case `characters`:
        if(str == 'a-z'){
          // console.log(`sort a-z`);
          arr.sort(function(a,b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          });
        } else if(str == 'z-a'){
          // console.log(`sort z-a`);
          arr.sort(function(a,b){
            if(a.name > b.name) { return -1; }
            if(a.name < b.name) { return 1; }
            return 0;
          });
        }
        break;
      case `comics`:
      case `events`:
      case `series`:
        if(str == 'a-z'){
          // console.log(`sort a-z`);
          arr.sort(function(a,b){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
          });
        } else if(str == 'z-a'){
          // console.log(`sort z-a`);
          arr.sort(function(a,b){
            if(a.title > b.title) { return -1; }
            if(a.title < b.title) { return 1; }
            return 0;
          });
        }
        break;
      case `creators`:
        if(str == 'a-z'){
          // console.log(`sort a-z`);
          arr.sort(function(a,b){
            if(a.fullName < b.fullName) { return -1; }
            if(a.fullName > b.fullName) { return 1; }
            return 0;
          });
        } else if(str == 'z-a'){
          // console.log(`sort z-a`);
          arr.sort(function(a,b){
            if(a.fullName > b.fullName) { return -1; }
            if(a.fullName < b.fullName) { return 1; }
            return 0;
          });
        }
        break;
    }
    // console.log(arr);
    func($this, arr);
  }

  render() {
    return(
      <React.Fragment >
        <FontAwesomeIcon icon={faFilter} size="2x" className="filter-icon" onClick={this.open} />
        <div className="filter-container">
          <h2>Sort</h2>
          <div>
            <FontAwesomeIcon icon={faCheckSquare} size="2x" />
            <FontAwesomeIcon icon={faSquare} size="2x" onClick={(e) => this.changeIcon(e, this.props.$this, 'a-z', function($this, arr){
              $this.setState({
                data: arr
              });
            })} />
            <FontAwesomeIcon icon={faSortAlphaDown} size="2x"/>
          </div>
          <div>
            <FontAwesomeIcon icon={faCheckSquare} size="2x" />
            <FontAwesomeIcon icon={faSquare} size="2x" onClick={(e) => this.changeIcon(e, this.props.$this, 'z-a', function($this, arr){
              $this.setState({
                data: arr
              });
            })} />
            <FontAwesomeIcon icon={faSortAlphaDownAlt} size="2x"/>
          </div>
          <div>
            <button onClick={this.close}>close</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
