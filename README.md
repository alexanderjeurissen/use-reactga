# usReactGA - provider & hook
![Publish](https://github.com/alexanderjeurissen/use-reactga/workflows/Publish/badge.svg?event=release)

This library provides a provider and hook to consume the initialized `ReactGA` context anywhere in the render tree.
It's removes the need to initialize ReactGA multiple times, and provides a way for react components to hook into an existing ReactGA instance.

### Installation

either with NPM or Yarn:

`yarn add @alexanderjeurissen/use-reactga`

or

`npm install --save @alexanderjeurissen/use-reactga`

### Basic usage

In most standalone React applications you likely want to decorate your whole application, or a submodule of your application.
Therefore in addition to the `withReactGAContext` HOC, access to the underlying provider and context is provided:

```js
import { ReactGAProvider } from '@alexanderjeurissen/use-reactGA';

const App = () => (
  <ReactGAProvider>
    <BrowserRouter>
      ...
    </BrowserRouter>
  </ReactGAProvider>
);

export default App;
```

There are situations where you want to decorate the result of a HOC, or situations where hooking the provider into existing callbacks and decorators is desired.
Here is an example of hooking the provider with Storybook, by passing it in the `addDecorator` method.
```js
import { withReactGAContext } from '@alexanderjeurissen/use-reactga';

addDecorator(storyFn => withReactGAContext(storyFn, 'UA-000000-01'));
```

The way this provider wraps a Node is exactly what the `withReactGAContext` hoc does in the previous example.
This is however a more standard modern React approach.

#### ReactGAProvider with custom ReactGA
There are cases where more fine-grained control is desired over the value that is passed to the provider.
This is especially useful if you use a custom/version pinned ReactGA, or if you'd like to use your local ReactGA version instead of the version packed with this library.

```js
import { ReactGAProvider } from '@alexanderjeurissen/use-reactGA';
import ReactGA from 'react-ga';

const App = () => (
  <ReactGAProvider ReactGA={ReactGA}>
    <BrowserRouter>
      ...
    </BrowserRouter>
  </ReactGAProvider>
);

export default App;
```
