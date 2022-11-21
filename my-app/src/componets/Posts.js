import React, { Component } from 'react'

export default class Post extends Component {
    render() {
        const post = this.props.p
        return (
            <div className="card postCard">
                <h5 className="profile-handle"><img src="" />@{post.author}</h5>
                <img src={post.img_url} />
                <div className="card-body main-post">
                    <div className='like-comment'>
                        <a className="likeButton" href="#"><i className="fa-regular fa-heart"></i>&nbsp;&nbsp;Like</a>
                        <a className="commentButton" href="#"><i className="fa-regular fa-comment"></i>&nbsp;&nbsp;Comment</a>
                    </div>
                    <h5><span className="handle-name">@{post.author}</span> <span className="caption">{post.caption}</span></h5>

                </div>
                <div className="card-body">
                    <div>
                        <p className='comment-header'>Comments</p>
                        <div className='comments'>
                            <span className='profile-name'>Diante</span> WOW! So Cool
                        </div>
                    </div>
                    <p className="card-text"><small className="text-muted">{post.date_created}</small></p>
                </div>

            </div>
        )
    }
}