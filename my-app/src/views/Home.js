import React, { Component } from 'react'
import Post from '../componets/Posts';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }


    showPosts = () => {
        return this.state.posts.map(p => <Post p={p} key={p.id}/>)
    }



    // componentDidMount = async () => {
    //     const res = await fetch('https://fakestoreapi.com/products/{id}')
    //     const data = await res.json()
    //     if (data.status==='ok') {
    //         this.setState({posts: data.data})
    //     }
    // }

    render() {
        return (
            <div className='showPosts'>
                {this.showPosts()}
            </div>
        )
    }
}