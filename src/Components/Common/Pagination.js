import { Fragment, useState } from "react";

const Pagination = (props) => {
  const [activePage, setActivePage] = useState(1);
  let total = props.total ? props.total : 1;
  let pageCount = props.pageCount ? props.pageCount : 1;
  let adjacentCount = 2;

  const getArray = () => {
    let count = 1;
    let array = ["Prev"];
    for (let i = 0; i < total; i += pageCount) {
      array.push(count++);
    }
    array.push("Next");
    return array;
  };
  let array = getArray();

  const visiblePages = {};
  for (let el of array) {
    if (el === "Prev" || el === "Next") visiblePages[el] = 1;
    if (el <= adjacentCount) visiblePages[el] = 1;
    if (activePage - adjacentCount <= el && el <= activePage + adjacentCount)
      visiblePages[el] = 1;
    if (total / pageCount - adjacentCount <= el && el <= total / pageCount)
      visiblePages[el] = 1;
  }

  const pageClickHandler = (el) => {
    if (el === "Prev") {
      if (activePage !== 1) {
        if (props.pageChangeHandler) {
          props.pageChangeHandler(null, activePage - 1);
        }
        setActivePage(activePage - 1);
      }
    } else if (el === "Next") {
      if (activePage !== array[array.length - 2]) {
        if (props.pageChangeHandler) {
          props.pageChangeHandler(null, activePage + 1);
        }
        setActivePage(activePage + 1);
      }
    } else {
      if (props.pageChangeHandler) {
        props.pageChangeHandler(null, el);
      }
      setActivePage(el);
    }
  };
  return (
    <Fragment>
      {array.map((el) => {
        if (visiblePages[el]) {
          return (
            <button
              className={
                "btn btn-small m-1 " +
                (el === activePage ? "btn-dark" : "btn-outline-dark")
              }
              onClick={() => pageClickHandler(el)}
            >
              {el}
            </button>
          );
        } else {
          return ".";
        }
      })}
    </Fragment>
  );
};
export default Pagination;
