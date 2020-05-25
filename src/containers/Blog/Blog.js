import React from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';

class Blog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            posts: [],
            selectedPostId: null,
            error: false
        }
    }
    
    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts =  posts.map(post => {
                    return {
                        ...post, 
                        author: 'KK'
                    }
                });
                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                //console.log(error);
                this.setState({error: true});
            });
    }
    
    postSelectedHandler = (id) => {
        console.log("id : " + id);
        this.setState({selectedPostId: id}, 
                    () => console.log("selectedPostId : " + this.state.selectedPostId));
        
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }
       
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;