import React from 'react';
import glamorous, {Div, Button, Input, Textarea} from 'glamorous'
import {
    gql,
    graphql,
    compose,
} from 'react-apollo';

import {API} from '../config'
import {findIngredient} from './importUtils'


class RecipeImporter extends React.Component {
  state = {loading: false, error: null}

  onPaste = e => {
    e.clipboardData.items[0].getAsString(url => {
      this.setState({loading: url})
      fetch(API + '/import?url=' + encodeURIComponent(url))
      .then(r => r.json())
      .then(res => {
        this.setState({loading: false})
        console.log('done', res)
        this.props.onDone({
          ...res,
          source: url,
          instructions: res.instructions.map(text => ({text, ingredientsUsed: []})),
          ingredients: res.ingredients.map(ingredient => {
            const [id, comments] = findIngredient(this.props.data.ingredients, ingredient.comments)
            return {...ingredient, ingredient: id, comments}
          })
        })
      })
      .catch(e => {
        this.setState({loading: false, error: 'unable to load'})
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <Div
        css={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          marginLeft: 8,
        }}
      >
        Importing from {this.state.loading}
      </Div>
    }

    return <Div
      css={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginLeft: 8,
      }}
    >
      Import from URL
      <Input
        css={{
          padding: 8,
          marginLeft: 16,
          fontSize: 16,
          flex: 1,
        }}
        onPaste={this.onPaste}
        placeholder="paste URL"
        value=''
      />
      {this.state.error && this.state.error}
    </Div>
  }
}

export const ingredientsQuery = gql`
# Maybe paging
query IngredientsQuery {
  ingredients {
    id
    name
    plural
  }
}
`

export default graphql(ingredientsQuery, {
  // options: ({id}) => ({
  //   // pollInterval: 60 * 1000,
  //   variables: {id},
  // })
})(RecipeImporter)

