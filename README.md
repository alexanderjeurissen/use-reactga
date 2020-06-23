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

In most standalone React applications you likely want to decorate your whole application, or a submodule of your application. For this usecase a provider is provided:

```jsx
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

and use anywhere in the render tree:

```jsx
import { useReactGA } from '@alexanderjeurissen/use-reactGA';

const Component = () = {
  const { event } = useReactGA();
  
  return (
    <input onCopy={e => {
      event({ category: 'SomeCategory', action: "Copy", value: e.target.value.length });
    }} />
  )
}
```

### ReactGA HOC

There are situations where you want to decorate the result of a HOC, or where hooking the provider into existing callbacks and decorators is desired.
For those usecases a `withReactGAContext` HOC is provided. Here is an example of hooking the provider with Storybook, by passing it in the `addDecorator` method.

```js
import { withReactGAContext } from '@alexanderjeurissen/use-reactga';

addDecorator(storyFn => withReactGAContext(storyFn, 'UA-000000-01'));
```

The `withReactGAContext` hoc consumes the same Provider as described in the previous example. It's a wrapper to allow the provider to be consumed in a functional fashion.

### ReactGAProvider with custom ReactGA

You might run into situations where more fine-grained control is desired over the value that is passed to the provider.
For instance if you use a custom/version pinned ReactGA, or if you'd like to use your local ReactGA version instead of the version packed with this library.
Therefore one can pass their *own* ReactGa module to the provider as a prop. The resulting context will use the ReactGA module that is passed into it, and fallback to the ReactGA version that is shipped with this library.

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
