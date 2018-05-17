'use strict';
const {getPage, parsePage, saveRatings, deployScrapers} = require('./utils');

module.exports.scrape = (event, context, callback) => {
  // 1. fetch yelp page
  getPage(event)
    // 2. parse the page
    .then(page => parsePage(page))
    // 3. save ratings data to db
    .then(yelpData => saveRatings(yelpData, event))
    .then(() => callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Scraped ${event}`,
      })
    }))
    .catch(error => 
      callback(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`))
    );
  };

  module.exports.launch_scrapers = (event, context, callback) => {
    // list business names
    const fakeDatabaseResults = [
      "urban-light-at-lacma-los-angeles",
      "the-museum-of-contemporary-art-los-angeles",
      "the-last-bookstore-los-angeles"
    ];

    // launch a lambda for each business name
    fakeDatabaseResults.forEach(businessName => {
      deployScrapers(businessName);
    })
  }
