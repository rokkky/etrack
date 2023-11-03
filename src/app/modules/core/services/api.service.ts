import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  query<R, V extends object>(
    query: DocumentNode,
    input?: V,
    disableCache?: boolean,
  ) {
    return this.apollo.query<R>({
      query: query,
      variables: input,
      fetchPolicy: disableCache ? 'no-cache' : 'cache-first',
    });
  }

  mutate<R, V extends object>(mutation: DocumentNode, input?: V) {
    return this.apollo.mutate<R>({
      mutation: mutation,
      variables: input,
    });
  }
}
