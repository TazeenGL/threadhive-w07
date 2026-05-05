import axiosInstance from "../api/axiosInstance";
import { COMMENT_API } from '../config/apiConfig';

export async function fetchCommentsForThread(threadId) {
  const res = await axiosInstance.get(COMMENT_API.GET_BY_THREAD(threadId));
  return res.data.data;
}

export async function postComment({ threadId, content }) {
  const res = await axiosInstance.post(COMMENT_API.CREATE, {
    thread: threadId,
    content,
  });
  return res.data.data;
}

export const upvoteComment = async (commentId) => {
  const res = await axiosInstance.post(COMMENT_API.UPVOTE(commentId));
  return res.data.data;
};

export const downvoteComment = async (commentId) => {
  const res = await axiosInstance.post(COMMENT_API.DOWNVOTE(commentId));
  return res.data.data;
};
