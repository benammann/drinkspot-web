import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '../environments/environment';
import {AuthenticationService} from './service/authentication.service';
import {ApolloLink} from 'apollo-link';
import {HttpHeaders} from '@angular/common/http';

const uri = environment.graphql; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, authentication: AuthenticationService) {

  const authMiddleware = new ApolloLink((operation, forward) => {

    if(authentication.singedIn.getValue()) {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', `Bearer ${authentication.jwtToken.getValue()}`)
      });
    }

    return forward(operation);
  });

  return {
    link: ApolloLink.from([authMiddleware, httpLink.create({uri})]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      }
    }
  }
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthenticationService],
    },
  ],
})
export class GraphQLModule {}
