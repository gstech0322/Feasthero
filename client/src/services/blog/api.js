import { ALL_BLOG_POSTS, FIND_BLOG_POST } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function fetchAllBlogPosts() {
    const response = await feastHeroAxios.get(ALL_BLOG_POSTS)
        .then((response) => response.data)
        .catch((_) => ({ error: true }));

    return response;
}

export async function fetchBlogPost(id) {
    const response = await feastHeroAxios.get(`${FIND_BLOG_POST}/${id}`)
        .then((response) => response.data[0])
        .catch((_) => ({ error: true }));

    return response;
}