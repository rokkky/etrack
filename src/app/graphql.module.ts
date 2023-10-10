import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  ApolloLink,
  ApolloClient,
  fromPromise,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment.prod';
import { REFRESH_TOKEN } from './graphql/mutations/refresh-token.mutation';
import jwtDecode from 'jwt-decode';
import { IToken } from './modules/authorization/types/token.interface';
import { StorageService } from './modules/core/services/storage.service';
import { Router } from '@angular/router';

const uri = environment.apiURL;

export function createApollo(
  httpLink: HttpLink,
  storageService: StorageService,
  router: Router,
): ApolloClientOptions<unknown> {
  const apolloLink = httpLink.create({ uri });
  const cache = new InMemoryCache();

  const getNewToken = () => {
    const refreshToken = storageService.getItem('refreshToken');
    const defaultApolloClient = new ApolloClient({
      link: ApolloLink.from([authHeaders, apolloLink]),
      cache,
    });
    return defaultApolloClient
      .mutate({ mutation: REFRESH_TOKEN, variables: { token: refreshToken } })
      .then((response) => {
        return response.data!.refreshToken;
      });
  };

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions['code']) {
          case 'UNAUTHENTICATED':
            return fromPromise(
              getNewToken().catch(() => {
                storageService.clearStorage();
                router.navigate(['login']);
                return;
              }),
            )
              .filter((value) => Boolean(value))
              .flatMap((tokens) => {
                const { accessToken, refreshToken } = tokens!;
                const userId = jwtDecode<IToken>(accessToken).sub;
                storageService.setItems({
                  accessToken,
                  refreshToken,
                  userId,
                });
                return forward(operation);
              });
        }
      }
    }
    return forward(operation);
  });

  const authHeaders = setContext(() => {
    const accessToken = storageService.getItem('accessToken');
    if (accessToken === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }
  });
  const link = ApolloLink.from([errorLink, authHeaders, apolloLink]);
  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, StorageService, Router],
    },
  ],
})
export class GraphQLModule {}
