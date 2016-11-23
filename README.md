Paginator for react.

Lightweight, focussable and responses to the keyboard.
This is **only** the UI-interface --> you need the callbacks to give it any functionality you want.

## How to use:

```js
const React = require("react"),
    ReactDOM = require("react-dom"),
    Paginator = require("itsa-react-paginator");

const pageSizes = [5, 10, 20, 50, 100, 250, 500, 1000, 'all items'];

const changePage = newPage => {
    props.page = newPage;
    renderPaginator();
};

const changePageSize = newIndex => {
    console.warn(newIndex);
    let newItemsPerPage = pageSizes[newIndex];
    if (typeof newItemsPerPage==='number') {
        props.itemsPerPage = newItemsPerPage;
    }
    else {
        delete props.itemsPerPage;
    }
    props.page = 1;
    renderPaginator();
};

let props = {
    onChange: changePage,
    onChangePageSize: changePageSize,
    itemsPerPage: 10,
    page: 1,
    pageSizes: pageSizes,
    totalItems: 1500
};

const renderPaginator = () => {
    console.warn(props);
    ReactDOM.render(
        <Paginator {...props} />,
        document.getElementById("component-container")
    );
};

renderPaginator();
```

## About the css

You need the right css in order to make use of `itsa-react-paginator`. There are 2 options:

1. You can use the css-files inside the `css`-folder.
2. You can use: `Component = require("itsa-react-paginator/lib/component-styled.jsx");` and build your project with `webpack`. This is needed, because you need the right plugin to handle a requirement of the `scss`-file.


[View live example](http://projects.itsasbreuk.nl/react-components/itsa-paginator/component.html)

[API](http://projects.itsasbreuk.nl/react-components/itsa-paginator/api/)