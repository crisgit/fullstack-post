import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

class App extends Component{
  state = {
    newPostContent: '',
    posts: [],
    };

    async componentDidMount() {
      const { data: posts } = await api.get('/posts');

      this.setState({ posts });
    }

    handleDelete = async (id) => {
      await api.delete(`/posts/${id}`);

      this.setState({ posts: this.state.posts.filter(item => item.id = id)});
    }

    handlePostSave = async (e) => {
      e.preventDefault();

      const { data: post } = await api.post('/posts', {content: this.state.newPostContent });

      this.setState({ posts: [ ...this.state.posts, post], newPostContent: '' });
  };

  render() {

    const mystyle = {
      color: "black",
      fontFamily: "Arial",
      padding: "20px",
      margin: "20px",
    };

    const button = {
      color: "#001a00",
      backgroundColor: "#00cc66",
      fontFamily: "Arial",
      margin: "20px",
    }

  return (
    <div style={ mystyle } className="App">
      <h3> Postagem de Notas </h3>
      <p> Digite na caixa abaixo: </p>
      <form onSubmit={this.handlePostSave}>
      <textarea 
      cols="30" 
      rows="10" 
      onChange={e => this.setState({newPostContent: e.target.value})}
      value={this.state.newPostContent}
      />
      <button style={ button } type="submit"> Postar </button>
      </form>

      <ul style={ { backgroundColor: "#f2f2f2"} }> 

        { this.state.posts.map(post => (
          <li onClick={ () => this.handleDelete(post.id)} key={ post.id }> { post.content }  <button style={ button }> Deletar </button> <br/><br/> <hr/> </li>
        )) }
      </ul>

    </div>
  );
  }
}

export default App;
