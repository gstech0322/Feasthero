import asAction from "../../helpers/as-redux-action"
import { fetchAllBlogPosts, fetchBlogPost } from "./api";
import { LOAD_ALL_POSTS_SUCCESS, LOAD_POST_SUCCESS, SELECT_BLOG_POST } from "./types"

function loadAllPostsSuccess(posts) {
    return asAction(LOAD_ALL_POSTS_SUCCESS, posts);
}

function loadPostSuccess(postData) {
    return asAction(LOAD_POST_SUCCESS, postData);
}

export function selectBlogPost(postData) {
    return asAction(SELECT_BLOG_POST, postData);
}

export function loadPosts() {
    return async (dispatch, getState) => {
        if (getState().blog.posts)
            return getState().blog.posts;

        const blogPosts = await fetchAllBlogPosts();

        if (blogPosts.error)
            throw new Error('Error loading blog, please try again.')

        dispatch(loadAllPostsSuccess(blogPosts));

        return blogPosts;
    }
}

export function loadPost(postId) {
    return async (dispatch, getState) => {
        if (getState().blog.selectedPost._id === postId)
            return getState().blog.selectedPost;

        const postData = await fetchBlogPost(postId);

        if (postData.error)
            throw new Error('Failed to load blog post, please try again.');

        dispatch(loadPostSuccess(postData));

        return postData;
    }
}