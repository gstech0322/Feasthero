import React from 'react';

import { Container } from 'react-bootstrap';

import Title from '../../../components/title/title';
import BlogPosts from './components/posts/blog-posts';



function Blog() {
    return (
        <>
            <Container id='blog'>
                <Title className='mb-5'>Blog</Title>
                <BlogPosts />
            </Container>
        </>
    )
}

export default Blog;