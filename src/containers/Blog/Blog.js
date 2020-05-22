import React from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';

class Blog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts =  posts.map(post => {
                    return {
                        ...post, 
                        author: 'KK'
                    }
                });
                this.setState({posts: updatedPosts});
                console.log(response);
            });
    }
    
    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author} />
        });
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;