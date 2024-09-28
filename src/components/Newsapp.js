import React, { useState } from 'react'
import Card from './Card'

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  const API_KEY = "927fc5f88bb04697babc456659271c44";

  // Updated getData function to accept custom search queries
  const getData = async (query) => {
    const searchQuery = query || search;  // Use query if provided, otherwise use search state
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`);
    const jsonData = await response.json();
    console.log(jsonData.articles);
    setNewsData(jsonData.articles);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  // Functions to handle category button clicks
  const handleCategoryClick = (category) => {
    setSearch(category);
    getData(category);  // Trigger search with the selected category
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul>
          <a>All News</a>
          <a>Trending</a>
        </ul>
        <div className='searchBar'>
          <input type='text' placeholder='Search News' onChange={handleInput} />
          <button onClick={() => getData()}>Search</button>
        </div>
      </nav>
      <div>
        <p className='head'>
          Stay Updated with TrendyNews
        </p>
      </div>
      <div className='categoryBtn'>
        <button onClick={() => handleCategoryClick('sports')}>Sports</button>
        <button onClick={() => handleCategoryClick('politics')}>Politics</button>
        <button onClick={() => handleCategoryClick('entertainment')}>Entertainment</button>
        <button onClick={() => handleCategoryClick('health')}>Health</button>
        <button onClick={() => handleCategoryClick('fitness')}>Fitness</button>
        <button onClick={() => handleCategoryClick('education')}>Education</button>
      </div>
      <div>
        {newsData ? <Card data={newsData} /> : null}
      </div>
    </div>
  )
}

export default Newsapp;
