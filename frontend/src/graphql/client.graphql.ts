import { ApolloClient, HttpLink, InMemoryCache, split, useSubscription } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
});
  
const wsLink = new WebSocketLink({
        uri: `ws://localhost:3000/graphql`,
        options: {
            reconnect: true,
        },
    })

  
const link = typeof window
    ? split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
        )
    : httpLink;

const client = new ApolloClient({
    ssrMode: !typeof window,
    link,
    cache: new InMemoryCache(),
  });

export default client;