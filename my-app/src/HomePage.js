import React from 'react';
import { Api } from './Api';

export class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.hover = this.hover.bind(this);
  }

  componentDidMount() {
    let url = `https://api.spoonacular.com/recipes/random?apiKey=${Api}&number=9&tags=dessert`;

    fetch(url)
      .then(res => res.json()).then((result) => {
        // console.log('from homePage after ajax');
        // console.log(this.state);

        this.setState({
            recipes: result.recipes,
        });

        document.getElementsByClassName('loading')[0].style.display = 'none';
        document.getElementsByClassName('hp')[0].style.display = 'flex';

        // console.log(this.state);
        }, (error) => {
            console.log(error);
        }
    )
  }

  hover(e){
    // console.log(e);
    // console.log(e.currentTarget);

    //get div
    var div = e.currentTarget;
    div = div.querySelector('div');
    // console.log(div);

    //add & remove class
    if(div.className === ""){
      div.classList.add("active");
    } else {
      div.classList.remove("active");
    }
  }

  render() {

    let recipes = this.state.recipes;
    // console.log(`from home page`);
    // console.log(recipes);

    var $this = this;

    let li = recipes.map(function(val, i) {
      var id = val.id;
      var title = val.title;
      var href = `/apps/recipe-finder/react/#/recipe/${id}`;
      var imgSrc = `https://spoonacular.com/recipeImages/${id}-636x393.jpg`;

      return (
        <li key={id} onMouseEnter={$this.hover} onMouseLeave={$this.hover}>
          <a href={href} data-id={id} className="recipe">
            <img src={imgSrc} alt={title} title={title} data-id={id} />
            <div>
              <h2>{val.title}</h2>
              <p>Cook time: {val.readyInMinutes} min</p>
              <p>Servings: {val.servings}</p>
            </div>
          </a>
        </li>
      );
    });

    // <ul className="hp" dangerouslySetInnerHTML={{__html: li}}></ul>

    return (
      <React.Fragment>
        <div className="homepage">
          <ul className="hp">
            {li}
          </ul>
        </div>
      </React.Fragment>
    );

  }
}
