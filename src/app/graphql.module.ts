import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment.prod';

const uri = environment.apiURL;

const authHeaders = setContext(() => {
  const token = localStorage.getItem('accessToken');
  if (token === null) {
    return {};
  } else {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = ApolloLink.from([authHeaders, httpLink.create({ uri })]);
  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
