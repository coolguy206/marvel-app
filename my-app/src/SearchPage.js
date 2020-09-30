import React from 'react';
import { Api } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.match.params.searchTerm,
      number: 50
    };
    this.changeSearch = this.changeSearch.bind(this);
  }

  componentDidMount() {

    // console.log(this.state);

    let searchTerm  = this.state.searchTerm;
    // console.log(searchTerm);
    var offset = Math.floor(Math.random() * 900);
    var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${Api}&query=${searchTerm}&number=${this.state.number}&offset=${offset}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
    // console.log(url)

    // fetch(url).then(res => res.json()).then((result) => {
    //   // console.log(`from search ajax`);
    //   // console.log(result);
    //
    //   this.setState({
    //     searchRecipes: result.results,
    //   });
    //
    //   document.getElementsByClassName("search")[0].style.display = "block";
    //   document.getElementsByClassName("loading")[0].style.display = "none";
    //
    // }, (error) => {
    //   console.log(error);
    // })
  }

  changeSearch(e){
    // console.log(`change search`);
    // console.log(e.currentTarget);
    window.scrollTo(0,0);
    document.getElementsByClassName("search")[0].style.display = "none";
    document.getElementsByClassName("loading")[0].style.display = "block";

    let searchTerm  = e.currentTarget.text;
    var offset = Math.floor(Math.random() * 900);
    var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${Api}&query=${searchTerm}&number=${this.state.number}&offset=${offset}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
    // console.log(url)

    // fetch(url).then(res => res.json()).then((result) => {
    //   // console.log(`from search ajax`);
    //   // console.log(result);
    //
    //   this.setState({
    //     searchRecipes: result.results,
    //   });
    //
    //   document.getElementsByClassName("search")[0].style.display = "block";
    //   document.getElementsByClassName("loading")[0].style.display = "none";
    //
    // }, (error) => {
    //   console.log(error);
    // })

  }

  render() {

    return (
      <React.Fragment>
        <div className="search">

        </div>
      </React.Fragment>
    )

  } //end of render
}
