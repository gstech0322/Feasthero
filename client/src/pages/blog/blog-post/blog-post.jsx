import React from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';

import Title from '../../../components/title/title';
import { loadPost } from '../../../services/blog/actions';
import timeSince from '../../../helpers/time-since-date';

import './blog-post.scss';
import useFetch from '../../../hooks/fetch';


function BlogPost(props) {
    const { loading, error, data } = useFetch(loadPost, { withDispatch: true }, props.match.params.id);


    if (loading || !data)
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )

    return (
        <>
            <Container className='mt-5'>
                {
                    error
                        ?
                        <h4 className='text-danger mt-4'>{error}</h4>
                        :
                        <section id='post'>
                            <Title>{data.title}</Title>
                            <div className='text-center my-4'>
                                <Image src={data.image} alt={data.title} />
                            </div>
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: data.content }} />
                            </div>
                            <div className='d-flex content'>
                                <p>By <b>{data.author}</b>,</p>
                                <p className='ml-2'>{timeSince(new Date(data.datePosted))} ago</p>
                            </div>
                        </section>
                }
            </Container>

        </>
    );
}

export default BlogPost;