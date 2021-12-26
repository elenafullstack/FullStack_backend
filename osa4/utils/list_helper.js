
// Load the full build.
const right = require('lodash');
// Load the core build.
const _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');




const dummy = (blogs) => {
    // ...

    return 1
  }

  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
      }

    const likes = blogs.map(x=>x.likes)
    return likes.reduce(reducer,0)
    
  }

  const mostBlogs = (blogs) => {

  
      const counted = right.countBy(blogs, (blog) => blog.author)
      const numbers = right.map(counted, counted.value)
      const maximum = right.max(numbers)
      const authors = blogs.map(x=>x.author)

      var i = 0

      while (counted[authors[i]] !== maximum) {
        i += 1
      }

     
     const winner = 
       {
       author: authors[i],
       blogs: counted[authors[i]]
       }
       
     return winner
  
    }

    const mostLikes = (blogs) => {
      
      const grouped= right.groupBy(blogs, (blog)=> blog.author)
      const authors = blogs.map(x=>x.author)
      const uniqueAuthors = right.uniq(authors, 'author')
     
      var i = 0 
      var j = 0
      var winningLikes = 0
      var currentLikes = 0
    

      while (i < uniqueAuthors.length) {
        currentLikes = 0
          while (j < grouped[uniqueAuthors[i]].length) {
           currentLikes += grouped[uniqueAuthors[i]][j].likes
           j += 1
          }

          if (currentLikes > winningLikes ) {
           winningLikes = currentLikes
           var winningAuthor = uniqueAuthors[i]
          }
        i += 1
        j = 0
    }
       const winner = {
            author: winningAuthor,
            likes: winningLikes
       }
  
      return winner
    }

     
  
  
  module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes
  }