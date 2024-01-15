import React, { useState, useEffect } from 'react';
import AddPost from './components/AddPost';
import Post from './components/Post';
import './assets/main.css';

function App() {
  // State to hold the list of posts
  const [posts, setPosts] = useState([]);

  // Function to fetch posts from a REST API
  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")  
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  // useEffect hook to fetch posts when the component initiated
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to add a new post
  const addPost = (title, body) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the new post
        setPosts((prevPosts) => [data, ...prevPosts]);
      });
  };

  // Function to delete a post by ID
  const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        // If the deletion is successful, update the state by removing the deleted post
        if (response.status === 200) {
          setPosts(
            posts.filter((post) => {
              return post.id !== id;
            })
          );
        }
      });
  };


  // JSX for the component
  return (
    <main>
      <h1>Consuming REST API Tutorial</h1>
      {/* AddPost component to add new posts */}
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {/* Display each post using the Post component */}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            deletePost={deletePost}
          />
        ))}
      </section>
    </main>
  );
}

// Export the App component
export default App;
