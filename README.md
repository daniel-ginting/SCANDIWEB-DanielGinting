Author: Daniel Ginting  
Email: daniel_yjg@yahoo.com



# SCANDIWEB React developer test
SCANDIWEB'S Entry Level React Developer position Test/Task.
By: Daniel Ginting

Daniel Ginting's solution to SCANDIWEB's React Developer task.

## Note
To run in local machine, start the GraphQL endpoint: https://github.com/scandiweb/junior-react-endpoint. But first you need to do the instructions in the corresponding repository.

After the server starts, if it starts at localhost:4000, you're good to go. But if somehow the server starts in a different port, go to src/index.js and change the uri to where your server is running.

```javascript
export const client = new ApolloClient({
  uri: "http://localhost:4000/", // ---> change this to where ever your GraphQL endpoint is running
  cache: new InMemoryCache(),
});
```

