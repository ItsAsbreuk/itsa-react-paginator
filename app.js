"use strict";

const React = require("react"),
    ReactDOM = require("react-dom"),
    Paginator = require("./lib/component-styled.jsx");

const pageSizes = [5, 10, 20, 50, 100, 250, 500, 1000, 'all items'];

const changePage = newPage => {
    props.page = newPage;
    renderPaginator();
};

const changePageSize = newIndex => {
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
    showCountOutOf: true,
    totalItems: 82
};

const renderPaginator = () => {
    ReactDOM.render(
        <Paginator {...props} />,
        document.getElementById("component-container")
    );
};

renderPaginator();