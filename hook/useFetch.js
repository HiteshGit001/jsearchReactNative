import { useState } from "react";
import axios from "axios";
import { SEARCH } from "./endPoints";
import { axiosRequest } from "../helper/request";

export const searchQuery = (endPoint, searchQuery, setError, setIsLoading) => {

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: { query: searchQuery, page: '1', num_pages: '1' },
    headers: {
      'X-RapidAPI-Key': "0a7172719bmsh81d04c6cf6f20ddp106170jsn7bf32c01847e",
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };
  const response = axiosRequest(options);
  try {
    setIsLoading(true);
    // setIsLoading(response)
    console.log(response);
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false);
  }
  return response;
}

export const jobDetails = (endPoint, id, setError, setIsLoading) => {

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: { job_id: id, page: '1', num_pages: '1' },
    headers: {
      'X-RapidAPI-Key': "0a7172719bmsh81d04c6cf6f20ddp106170jsn7bf32c01847e",
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };
  const response = axiosRequest(options);
  try {
    setIsLoading(true);
    // setIsLoading(response)
    console.log(response);
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false);
  }
  return response;
}