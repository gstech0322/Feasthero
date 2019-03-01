import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useDispatch } from 'react-redux';

import timeSince from '../../../../../../helpers/time-since-date';
import truncateString from '../../../../../../helpers/truncate-string';
import { selectBlogPost } from '../../../../../../services/blog/actions';

import './content.scss';

function Content(props) {
    const { postData } = props;
    const dispatch = useDispatch();

    return (
        <>
            <section className='content'>
                <h3>{postData.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: truncateString(postData.content, 600) }} />
                <Link to={`/blog/post/${postData._id}`} onClick={() => dispatch(selectBlogPost(postData))}>Read More</Link>
                <div className='d-flex'>
                    <p>By <b>{postData.author}</b>,</p>
                    <p className='ml-2'>{timeSince(new Date(postData.datePosted))} ago</p>
                </div>
            </section>
        </>
    );
}

export default Content;