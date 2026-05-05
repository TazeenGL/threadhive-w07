import axiosInstance from '../api/axiosInstance';
import { THREAD_API } from '../config/apiConfig';

export async function fetchRecentThreads() {
  const res = await axiosInstance.get(THREAD_API.GET_ALL);
  return res.data.data;
}

export async function fetchThreadById(threadId) {
  const res = await axiosInstance.get(THREAD_API.GET_BY_ID(threadId));
  return res.data.data;
}

export const createThread = async (data) => {
  const res = await axiosInstance.post(THREAD_API.CREATE, data);
  return res.data.data;
};

export async function upvoteThread(threadId) {
  const res = await axiosInstance.post(THREAD_API.UPVOTE(threadId));
  return res.data.data;
}

export async function downvoteThread(threadId) {
  const res = await axiosInstance.post(THREAD_API.DOWNVOTE(threadId));
  return res.data.data;
}
