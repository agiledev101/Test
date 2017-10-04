import React, { PropTypes } from 'react';

const propTypes = {
  first: PropTypes.bool,
  firstText: PropTypes.string,
  initialPage: PropTypes.number,
  items: PropTypes.array.isRequired,
  last: PropTypes.bool,
  lastText: PropTypes.string,
  nextText: PropTypes.string,
  onChangePage: PropTypes.func.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  prevText: PropTypes.string
}

const defaultProps = {
  initialPage: 1
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      pager: { } 
    };
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('this.props: ' + this.props.items)
    // console.log('prevProps' + prevProps.items)
    // console.log(this.props.items !== prevProps.items)
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    let items = this.props.items;
    let pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState(Object.assign({}, this.state, { 
      pager: pager 
    }));

    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage) {
    currentPage = currentPage || 1;

    let pageSize = this.props.pageSize || 10;

    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;

    if (totalPages <= this.props.pageLimit) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= (this.props.pageLimit / 2)) {
        startPage = 1;
        endPage = this.props.pageLimit;
      } else if (currentPage + (this.props.pageLimit / 2) >= totalPages) {
        startPage = totalPages - (this.props.pageLimit - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - ((this.props.pageLimit % 2 === 0) ? (parseInt(this.props.pageLimit / 2) - 1) : (parseInt(this.props.pageLimit / 2)));
        endPage = currentPage + ((this.props.pageLimit % 2 === 0) ? (parseInt(this.props.pageLimit / 2)) : parseInt(this.props.pageLimit / 2));
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <ul className="pagination">
        {(this.props.first) ? 
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => this.setPage(1)}>{(this.props.firstText) ? this.props.firstText: 'First'}</a>
          </li> :
          ''
        }
        
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>{(this.props.prevText) ? this.props.prevText : 'Previous'}</a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>{(this.props.nextText) ? this.props.nextText : 'Next'}</a>
        </li>
        {(this.props.last) ? 
          <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            <a onClick={() => this.setPage(pager.totalPages)}>{(this.props.lastText) ? this.props.lastText : 'Last'}</a>
          </li> :
          ''
        }
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps;
export default Pagination;