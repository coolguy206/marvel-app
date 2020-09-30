import React from 'react';
import { Api } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
// import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';

export class PdpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
    this.changePdp = this.changePdp.bind(this);
  }

  componentDidMount() {
    let id  = this.props.match.params.Id;
    let cat = this.props.match.params.Category;

    // var offset = Math.floor(Math.random() * 900);
    let baseURL = `http://gateway.marvel.com/v1/public/`;

    let url = `${baseURL}${cat}/${id}?apikey=${Api}`;
    // console.log(url);
    fetch(url)
      .then(res => res.json()).then((results) => {
        console.log('from pdp page after ajax');
        console.log(results);

        // this.setState({
        //     comics: results.data.results
        // });
    
        // document.getElementsByClassName('loading')[0].style.display = 'none';
        // document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )



  }

  handleClick(e) {

  }

  changePdp(e){

  }

  render() {

    return (
      <React.Fragment>
        <div class="pdp">
        </div>
      </React.Fragment>
    );

  } //end of render
}
