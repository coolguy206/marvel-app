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

    fetch(url).then(res => res.json()).then((result) => {
      // console.log(`from search ajax`);
      // console.log(result);

      this.setState({
        searchRecipes: result.results,
      });

      document.getElementsByClassName("search")[0].style.display = "block";
      document.getElementsByClassName("loading")[0].style.display = "none";

    }, (error) => {
      console.log(error);
    })
  }

  // cookTime(e){
    // console.log('cooktime clicked');
    // console.log(e.currentTarget);
    // console.log(`is checked: ${e.currentTarget.checked}`)
    // var value = Number(e.currentTarget.value);
    // console.log(value);
  // }

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

    fetch(url).then(res => res.json()).then((result) => {
      // console.log(`from search ajax`);
      // console.log(result);

      this.setState({
        searchRecipes: result.results,
      });

      document.getElementsByClassName("search")[0].style.display = "block";
      document.getElementsByClassName("loading")[0].style.display = "none";

    }, (error) => {
      console.log(error);
    })

  }

  render() {
    // console.log(`from search render`);
    // console.log(this.state);
    // this.setState({
    //   searchTerm: this.props.match.params.searchTerm
    // });

    // console.log(this.state);

    var $this = this;

    let searchTerm  = this.props.match.params.searchTerm;

    if(this.state.searchRecipes !== undefined){
      // var li = ``;
      var searchResults = this.state.searchRecipes;
      // console.log(searchResults.length);
      var h2 =``;
      if(searchResults.length === 0) {
        h2 = `Oops no results for "${searchTerm}".`
        return (
          <div className="search">
            <h2>{h2}</h2>
            <h2>Please try another search.</h2>
          </div>
        );

      } else {
        h2 = `Search results for "${searchTerm}"`
        let li = searchResults.map(function(val, i) {
          // console.log(val);
          // var imgsrc = val.image;
          var title = val.title;
          var servings = val.servings;
          var cookTime = val.readyInMinutes;
          var id = val.id;
          var url = `/apps/recipe-finder/react/#/recipe/${id}`;
          var imgsrc = `https://spoonacular.com/recipeImages/${id}-636x393.jpg`;

          var tags = "";
          var cuisines = val.cuisines;
          var dishTypes = val.dishTypes;
          var occasions = val.occasions;
          var diets = val.diets;
          tags = `${cuisines}, ${dishTypes}, ${occasions}, ${diets}`;
          tags = tags.split(',');
          // console.log(tags);
          // var tagsLi = '';
          var tagsLi = tags.map(function(val, i){
            // console.log(val);
            if(val !== "" && val !== " "){
              // var html = `<li><a href="/search/${val}">${val}</a></li>`;
              // tagsLi = tagsLi + html;
              var url = `/apps/recipe-finder/react/#/search/${val}`;
              return(
                <a href={url} key={i} onClick={$this.changeSearch}>{val}</a>
              )
            }
          });

          var likes = val.aggregateLikes;
          var protein = val.nutrition.caloricBreakdown.percentProtein;
          var carbs = val.nutrition.caloricBreakdown.percentCarbs;
          var fats = val.nutrition.caloricBreakdown.percentFat;


          return (
            <li key={id} data-cook={cookTime} data-likes={likes} data-protein={protein} data-carbs={carbs} data-fats={fats}>
              <a href={url} className="recipe">
                <img src={imgsrc} alt={title} title={title} />
                <div>
                  <h2>{title}</h2>
                  <h3><FontAwesomeIcon icon={faTag} size="lg"/> <span>Tags:</span> {tagsLi} </h3>
                  <p><FontAwesomeIcon icon={faHourglass} size="lg"/> Cook time: {cookTime} min</p>
                  <p><FontAwesomeIcon icon={faUtensils} size="lg"/> Servings: {servings}</p>
                  <p><FontAwesomeIcon icon={faThumbsUp} size="lg"/> {likes}</p>
                </div>
              </a>
            </li>
          );
        }); //end of searchResults.map

        return (
          <React.Fragment>
            <div className="search">
              <h2>{h2}</h2>
              <ul className="search-list">
                {li}
              </ul>
            </div>
          </React.Fragment>
        )

      } //end of searchResults.length === 0

    } else {
      return null;
    } //end of this.state.searchRecipes undefined

  } //end of render
}
