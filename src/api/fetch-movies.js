import axios from 'axios';

const API_KEY = '1c322352';

export const getMoviesByTitle = async (title, pageNum = 1) => {
  const response = await axios.get(`http://omdbapi.com`, {
    params: {
      apikey: API_KEY,
      s: title,
      page: pageNum
    }
  }).then(data => { return data.data })

  return response;
};

export const getMovieDetailById = async id => {
  const response = await axios.get(`http://omdbapi.com`, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: 'full'
    }
  }).then(data => { return data.data })

  return response;
};