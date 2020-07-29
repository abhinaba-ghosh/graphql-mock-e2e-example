# GraphQL-Mock-Example: Testcafe vs Cypress

| Library Used          | NPM Link                                                    |
| --------------------- | ----------------------------------------------------------- |
| cypress-graphql-mock  | [here](https://www.npmjs.com/package/testcafe-graphql-mock) |
| testcafe-graphql-mock | [here](https://www.npmjs.com/package/cypress-graphql-mock)  |

## Instructions to test:

- start the client app

```ssh
cd client

npm install

SKIP_PREFLIGHT_CHECK=true npm start
```

- Testcafe mock tests

```ssh
# start another terminal in root directory

npm run testcafe:test
```

- Cypress mock tests

```ssh
npm run cypress:test
```

## cypress-graphql-mock

### Basic usage

```js
beforeEach(() => {
  cy.task('getSchema').then((schema) => {
    cy.mockGraphql({});
  });
});

it('Should mock getUser', () => {
  cy.mockGraphqlOps({
    operations: {
      getUser: {
        user: {
          id: 1,
          name: 'Name',
          email: 'Email',
        },
      },
    },
  });

  cy.visit('/');
  cy.get('#GET_USER').click();
  cy.get('#data').should(
    'contain',
    JSON.stringify({
      user: { id: 1, name: 'Name', email: 'Email', __typename: 'User' },
    })
  );
});
```

## testcafe-graphql-mock

### Basic Usage

```js
import { mockGraphQL } from 'testcafe-graphql-mock';

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
