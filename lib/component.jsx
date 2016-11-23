"use strict";

/**
 * Description here
 *
 *
 *
 * <i>Copyright (c) 2016 ItsAsbreuk - http://itsasbreuk.nl</i><br>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module component.jsx
 * @class Component
 * @since 15.0.0
*/

const React = require("react"),
    PropTypes = React.PropTypes,
    Button = require("itsa-react-button"),
    ToggleButton = require("itsa-react-togglebutton"),
    Select = require("itsa-react-select"),
    MAIN_CLASS = "itsa-paginator",
    FORM_ELEMENT_CLASS_SPACES = " itsa-formelement";

const Paginator = React.createClass({

    propTypes: {
        /**
         * How many items are shown on a page. This value is needed to generate the pagebuttons.
         * When not set, all items are supposed to be shown on a single page.
         *
         * @property itemsPerPage
         * @type Number
         * @since 15.0.0
        */
        itemsPerPage: PropTypes.number,

        /**
         * The message before the `itemsPerPage` selector
         *
         * @property itemsPerPageMsg
         * @type String
         * @since 15.0.0
        */
        itemsPerPageMsg: PropTypes.string,

        /**
         * The callback whenever a page is changed.
         * The callback gets 1 argument --> newPage, which is the pagenumber (starting at 1).
         *
         * @property onChange
         * @type Function
         * @required
         * @since 15.0.0
        */
        onChange: PropTypes.func.isRequired,

        /**
         * The callback whenever a page is changed.
         * The callback get1 1 argument --> newIndex, which is the selected index within the property `pageSizes`.
         *
         * @property onChangePageSize
         * @type Function
         * @since 15.0.0
        */
        onChangePageSize: PropTypes.func,

        /**
         * The current pagenumber (starting at 1).
         *
         * @property page
         * @type Number
         * @required
         * @since 15.0.0
        */
        page: PropTypes.number.isRequired,

        /**
         * The pageSizes. In order to wotk well with `onChangePageSize`, it is recomended to fill this array with `numbers`.
         * In this case, the callback can pick up the number straight ahead and pass it into `itemsPerPage` at once.
         *
         * @property pageSizes
         * @type Array
         * @since 15.0.0
        */
        pageSizes: PropTypes.array,

        /**
         * The tabIndex. All sub-items will get this same tabindex.
         *
         * @property tabIndex
         * @type Number
         * @since 15.0.0
        */
        tabIndex: PropTypes.number,

        /**
         * The Total itemcount of the array where the paginator relates to. This number is used to calculate and generate the buttons.
         *
         * @property totalItems
         * @type Number
         * @required
         * @since 15.0.0
        */
        totalItems: PropTypes.number.isRequired
    },

    /**
     * The initial props.
     *
     * @method getDefaultProps
     * @return Object
     * @since 15.0.0
     */
    getDefaultProps() {
        return {
            itemsPerPageMsg: 'items per page'
        };
    },

    /**
     * Will reset the current `page`, by calling the callback `props.onChange`.
     *
     * @method gotoPage
     * @since 15.0.0
     */
    gotoPage(page) {
        this.props.onChange(page);
    },

    /**
     * Will set the `itemsPerPage`, by calling the callback `props.onChangePageSize`.
     *
     * @method gotoPage
     * @since 15.0.0
     */
    changePageSize(newIndex) {
        this.props.onChangePageSize(newIndex);
    },

    /**
     * Renders the `select-sizes` Select-Component.
     *
     * @method renderSelectSizes
     * @return ReactComponent
     * @since 15.0.0
     */
    renderSelectSizes() {
        const props = this.props,
            pageSizes = props.pageSizes,
            pageSizesSize = pageSizes.length-1;
        let selected = pageSizes.indexOf(props.itemsPerPage);

        if ((selected===-1) && (typeof pageSizes[pageSizesSize]==='string')) {
            selected = pageSizesSize;
        }
        return (
            <div className="select-sizes" key="select-sizes">
                {props.itemsPerPageMsg}
                <Select
                    items={pageSizes.map(item => item.toString())}
                    onChange={this.changePageSize}
                    selected={selected}
                    tabIndex={props.tabIndex} />
            </div>
        );
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponent
     * @since 15.0.0
     */
    render() {
        let classname = MAIN_CLASS+FORM_ELEMENT_CLASS_SPACES,
            btnFirst, btnPrevious, btnNext, btnLast, btn1, btn2, btn3, btn4, btn5,
            startGotoBtn, gotoBtn1, gotoBtn2, gotoBtn3, gotoBtn4, gotoBtn5, selectSizes;

        const instance = this,
            props = instance.props,
            pageSizes = props.pageSizes,
            tabIndex = props.tabIndex,
            itemsPerPage = props.itemsPerPage,
            totalItems = props.totalItems,
            maxPage = itemsPerPage ? Math.ceil(totalItems/(itemsPerPage || 1)) : 1,
            page = Math.min(maxPage, Math.max(1, props.page)),
            prevPage = Math.max(1, page-1),
            nextPage = Math.min(maxPage, page+1),
            isFirstPage = page===1,
            isLastPage = page===maxPage;

        if (pageSizes && (pageSizes.length>0)) {
            selectSizes = instance.renderSelectSizes();
        }

        btnFirst = (
            <Button
                buttonHTML="&Lt;"
                disabled={isFirstPage}
                key="first"
                onClick={instance.gotoPage.bind(instance, 1)}
                tabIndex={tabIndex} />
        );
        btnPrevious = (
            <Button
                buttonHTML="&lt;"
                disabled={isFirstPage}
                key="previous"
                onClick={instance.gotoPage.bind(instance, prevPage)}
                tabIndex={tabIndex} />
        );
        btnNext = (
            <Button
                buttonHTML="&gt;"
                disabled={isLastPage}
                key="next"
                onClick={instance.gotoPage.bind(instance, nextPage)}
                tabIndex={tabIndex} />
        );
        btnLast = (
            <Button
                buttonHTML="&Gt;"
                disabled={isLastPage}
                key="last"
                onClick={instance.gotoPage.bind(instance, maxPage)}
                tabIndex={tabIndex} />
        );
        startGotoBtn = page-2;
        (startGotoBtn>maxPage-4) && (startGotoBtn=maxPage-4);
        (startGotoBtn<1) && (startGotoBtn=1);
        gotoBtn1 = startGotoBtn;
        gotoBtn2 = startGotoBtn+1;
        gotoBtn3 = startGotoBtn+2;
        gotoBtn4 = startGotoBtn+3;
        gotoBtn5 = startGotoBtn+4;
        btn1 = (
            <ToggleButton
                buttonText={gotoBtn1.toString()}
                key="1"
                onChange={instance.gotoPage.bind(instance, gotoBtn1, 1)}
                pressed={page===gotoBtn1}
                tabIndex={tabIndex} />
        );
        if (maxPage>1) {
            btn2 = (
                <ToggleButton
                    buttonText={gotoBtn2.toString()}
                    key="2"
                    onChange={instance.gotoPage.bind(instance, gotoBtn2, 2)}
                    pressed={page===gotoBtn2}
                    tabIndex={tabIndex} />
            );
        }
        if (maxPage>2) {
            btn3 = (
                <ToggleButton
                    buttonText={gotoBtn3.toString()}
                    key="3"
                    onChange={instance.gotoPage.bind(instance, gotoBtn3, 3)}
                    pressed={page===gotoBtn3}
                    tabIndex={tabIndex} />
            );
        }
        if (maxPage>3) {
            btn4 = (
                <ToggleButton
                    buttonText={gotoBtn4.toString()}
                    key="4"
                    onChange={instance.gotoPage.bind(instance, gotoBtn4, 4)}
                    pressed={page===gotoBtn4}
                    tabIndex={tabIndex} />
            );
        }
        if (maxPage>4) {
            btn5 = (
                <ToggleButton
                    buttonText={gotoBtn5.toString()}
                    key="5"
                    onChange={instance.gotoPage.bind(instance, gotoBtn5, 5)}
                    pressed={page===gotoBtn5}
                    tabIndex={tabIndex} />
            );
        }
        return (
            <div className={classname} >
                {selectSizes}
                {btnFirst}
                {btnPrevious}
                {btn1}
                {btn2}
                {btn3}
                {btn4}
                {btn5}
                {btnNext}
                {btnLast}
            </div>
        );
    }

});

module.exports = Paginator;
