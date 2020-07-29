# Testcafe-Cypress-GraphQL-Mock-Example

# testcafe-graphql-mock

## API available

```ts
interface MockGraphQLOptions {
  schema: string | string[] | IntrospectionQuery;
  mock: IMocks;
  delay?: number;
}

mockGraphQL(options: MockGraphQLOptions, req, res);
```

## Basic Usage

```js
import { mockGraphQL } from 'testcafe-graphql-mock';

// define the schema
const schema = `
type Person {
  firstname: String!
  surname: String!
}

type Query {
  people: [Person]
}
`;

// define the mock
const mock = {
  Query: () => ({
    people: () => [
      {
        firstname: 'Lee',
        surname: 'Byron',
      },
    ],
  }),
};

// create traditional testcafe request mock
const requestMock = RequestMock()
  .onRequestTo({ url: 'http://localhost:3000/graphql', method: 'POST' })
  .respond(async (req, res) => {
    await mockGraphQL(
      {
        schema,
        mock,
      },
      req,
      res
    );
  });

// now call the testcafe request mock in fixures as request hooks
fixture(`GraphQL Mock test`)
  .page('http://localhost:3000/')
  .requestHooks(requestMock);

test('test graphql mock data', async (t) => {
  await t.click(Selector('button'));
  await expect(Selector('div')).contains('Lee Byron');
});
```

## Read schema from .graphql file

You need to use `graphQLSchemaFromFile` method from the library.

```js
import { graphQLSchemaFromFile } from 'testcafe-graphql-mock';

// use the graphql schema reader method in your request mocks
const requestMock = RequestMock()
  .onRequestTo({ url: 'http://localhost:3000/graphql', method: 'POST' })
  .respond(async (req, res) => {
    await mockGraphQL(
      {
        schema: graphQLSchemaFromFile(
          `${process.cwd()}/test/test-schema.graphql`
        ),
        mock,
      },
      req,
      res
    );
  });
```

## Delay the GraphQL mocked response

use the `delay` (in milliseconds) parameter in `mockGraphQL({})` options

```js
const requestMock = RequestMock()
  .onRequestTo({ url: 'http://localhost:3000/graphql', method: 'POST' })
  .respond(async (req, res) => {
    await mockGraphQL(
      {
        schema,
        mock,
        delay: 5000,
      },
      req,
      res
    );
  });
```
