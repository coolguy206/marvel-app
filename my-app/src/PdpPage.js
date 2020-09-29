import React from 'react';
import { Api } from './Api';
import { Wines } from './Wines';
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
    let recipeId  = this.props.match.params.recipeId;

    let url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${Api}&includeNutrition=true`;
    // console.log(url)

    fetch(url).then(res => res.json()).then((result) => {
      // console.log(result);
      this.setState({
        recipe: result,
      });

      document.getElementsByClassName('loading')[0].style.display = 'none';
      document.getElementsByClassName('main')[0].childNodes[1].style.display = 'flex';

    }, (error) => {
      console.log(error);
    })

    let similarRecipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${Api}&number=4`;

    fetch(similarRecipeUrl).then(res => res.json()).then((result) => {
      // console.log(result);
      this.setState({
        similarRecipes: result,
      });
    }, (error) => {
      console.log(error);
    })
  }

  handleClick(e) {
    // console.log(`ingredients clicked`);
    // console.log(e.currentTarget);

    var current = e.currentTarget.className.baseVal;
    if (current === `svg-inline--fa fa-square fa-w-14 fa-3x `){
      // console.log(`its a box`);
      e.currentTarget.style.display = 'none';
      e.currentTarget.nextSibling.style.display = 'inline';
    } else {
      // console.log(`its a checkbox`);
      e.currentTarget.style.display = 'none';
      e.currentTarget.previousSibling.style.display = 'inline';
    }
  }

  changePdp(e){
    // console.log(`change pdp`);
    // console.log(e.currentTarget);
    window.scrollTo(0,0);
    document.getElementsByClassName('loading')[0].style.display = 'block';
    document.getElementsByClassName('main')[0].childNodes[1].style.display = 'none';

    var id = e.currentTarget.attributes[1].value;
    // console.log(id);

    let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${Api}&includeNutrition=true`;
    // console.log(url)

    fetch(url).then(res => res.json()).then((result) => {
      // console.log(result);
      this.setState({
        recipe: result,
      });

    }, (error) => {
      console.log(error);
    })

    let similarRecipeUrl = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${Api}&number=4`;

    fetch(similarRecipeUrl).then(res => res.json()).then((result) => {
      // console.log(result);
      this.setState({
        similarRecipes: result,
      });

      document.getElementsByClassName('loading')[0].style.display = 'none';
      document.getElementsByClassName('main')[0].childNodes[1].style.display = 'flex';

    }, (error) => {
      console.log(error);
    })

  }

  render() {
    // console.log(`from pdp page`);
    // console.log(this.state);
    var $this = this;

    if(this.state.recipe !== undefined){
      const recipe = this.state.recipe;
      var id = recipe.id;
      // const img = `https://spoonacular.com/recipeImages/${id}-556x370.jpg`;
      var img = `https://spoonacular.com/recipeImages/${id}-636x393.jpg`;
      // const img = recipe.image;
      const isGluten = recipe.glutenFree;

      var gluten = '';
      if (isGluten === true) {
        gluten = 'Yes';
      } else {
        gluten = 'No';
      }

      const ingredients = recipe.extendedIngredients;
      let ingredientsLi = ingredients.map(function(val, i) {
        return (
          <li key={i}>
            <FontAwesomeIcon icon={faSquare} size="3x" onClick={$this.handleClick} />
            <FontAwesomeIcon icon={faCheckSquare} size="3x" onClick={$this.handleClick} className="check" />
            {val.original}
          </li>
        );
      });

      const instructions = recipe.analyzedInstructions;
      let instructionsLi = instructions.map(function(val, i) {
        var name = val.name;
        var steps = val.steps;
        steps = steps.map(function(obj, j){
          return (
            <li key={j}>{obj.step}</li>
          )
        });

        return (
          <li key={i}>
            {name}
            <ol>
              {steps}
              </ol>
          </li>
        );
      });

      const wines = recipe.winePairing.pairedWines;
      // if(wines !== undefined){
      //   var winesLi = wines.map(function(val, i) {
      //     var url = `/search/${val}`;
      //     return (
      //       <li key={i}>
      //         {val}
      //       </li>
      //     );
      //   });
      // }

      var tags = "";
      var cuisines = recipe.cuisines;
      var dishTypes = recipe.dishTypes;
      var occasions = recipe.occasions;
      var diets = recipe.diets;
      tags = `${cuisines}, ${dishTypes}, ${occasions}, ${diets}`;
      tags = tags.split(',');
      // console.log(tags);

      var tagsLi = tags.map(function(val, i){
        // console.log(val);
        if(val !== "" && val !== " "){
          var url = `/apps/recipe-finder/react/#/search/${val}`;

          return(
            <a href={url} key={i}>{val}</a>
          )
        }
      });

      if(this.state.similarRecipes !== undefined){
        var similarRecipes = this.state.similarRecipes;
        // console.log(similarRecipes);
        var similarRecipesLi = similarRecipes.map(function(val,i){
          var id = val.id;
          var href = `/apps/recipe-finder/react/#/recipe/${id}`;
          var imgSrc = `https://spoonacular.com/recipeImages/${id}-636x393.jpg`;

          return (
            <li key={i}>
              <a href={href} data-id={val.id} className="recipe" onClick={$this.changePdp}>
                <img src={imgSrc} alt={val.title} title={val.title} data-id={val.id} />
                <div>
                  <h2>{val.title}</h2>
                  <p><FontAwesomeIcon icon={faHourglass} size="lg"/>  Cook time: {val.readyInMinutes} min</p>
                  <p><FontAwesomeIcon icon={faUtensils} size="lg"/>  Servings: {val.servings}</p>
                </div>
              </a>
            </li>
          )
        });
      }

      return (
        <React.Fragment>
          <div className="pdp">
            <div>
                <img src={img} alt={recipe.title} title={recipe.title} />
            </div>

            <div>
              <h2>{recipe.title}</h2>
              <h3>Description</h3>
              <p dangerouslySetInnerHTML={{__html: recipe.summary}} />
              <p className="tags"><FontAwesomeIcon icon={faTag} size="lg"/> <span>Tags:</span> {tagsLi}</p>
              <p><FontAwesomeIcon icon={faHourglass} size="lg"/> Cook time: {recipe.readyInMinutes} min</p>
              <p><FontAwesomeIcon icon={faUtensils} size="lg"/> Servings: {recipe.servings}</p>
              <p><FontAwesomeIcon icon={faThumbsUp} size="lg"/> {recipe.aggregateLikes}</p>
              <p>Gluten Free: {gluten}</p>
              <h3><FontAwesomeIcon icon={faCarrot} size="lg"/> Ingredients</h3>
              <ul className="ingredients">
                {ingredientsLi}
              </ul>
              <h3>Instructions</h3>
              <ol>
                {instructionsLi}
              </ol>
              <Wines winesList={wines} wineText={recipe.winePairing.pairingText}/>
            </div>

            <div className="similar-recipes">
              <h2>Similar Recipes</h2>
              <ul>
                {similarRecipesLi}
              </ul>
            </div>

          </div>
        </React.Fragment>
      );

    } else {
      return null;
    } //end of this.state.recipe

  } //end of render
}
