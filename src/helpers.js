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

export const readDataFromLS = () => {
  const storageName = 'favoriteMovies';
  const doesItExist = localStorage.getItem(storageName);
  if (!doesItExist) {
    return null;
  } else {
    const data = JSON.parse(localStorage.getItem(storageName));
    return data;
  }
}

export const writeDataToLS = obj => {
  const storageName = 'favoriteMovies';
  const doesItExist = localStorage.getItem(storageName);
  if (!doesItExist) {
    const arr = [{ ...obj }];
    localStorage.setItem(storageName, JSON.stringify(arr))
  } else {
    const data = JSON.parse(localStorage.getItem(storageName));
    data.push(obj);
    localStorage.setItem(storageName, JSON.stringify(data));
  }
}

export const deleteDataInLS = id => {
  const storageName = 'favoriteMovies';
  const doesItExist = localStorage.getItem(storageName);
  if (!doesItExist) {
    return null;
  } else {
    const data = JSON.parse(localStorage.getItem(storageName));
    const index = data.findIndex(obj => obj.imdbID === id);
    data.splice(index, 1);
    if (data.length === 0) {
      localStorage.removeItem(storageName);
    } else {
      localStorage.setItem(storageName, JSON.stringify(data));
    }
  }
}

export const titleLengthReducer = str => {
  const maxLengthLimit = 30;
  if (maxLengthLimit < str.length) {
    const newStr = str.slice(0, maxLengthLimit + 2);
    return `${newStr}...`;
  }
  return str;
}

export const calcNextPageNumber = (total, currMoviesLength) => {
  const maxPagesCount = Math.ceil(total / 10) || 1;
  const nextPage = (currMoviesLength / 10) + 1;
  if (maxPagesCount >= nextPage) {
    return nextPage;
  }
  return maxPagesCount;
}