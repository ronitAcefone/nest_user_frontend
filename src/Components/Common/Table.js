function Table(props) {
  let headings = props?.headings
    ? props.headings
    : [
        {
          id: "sn",
          value: "SN",
          colspan: 1,
        },
        {
          id: null,
          value: "Headers not set",
          colspan: 2,
        },
      ];

  let data = props?.data
    ? props.data
    : [
        {
          id: 1,
          value: "No Data found",
        },
      ];

  return (
    <table className="table table-hover table-bordered table-responsive table-secondary p-2">
      <thead>
        <tr>
          {headings.map((el) => {
            return <th style={{border: '1px solid white', margin : 0}}>{el.value}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((el) => {
          return (
            <tr key={el._id}>
              {headings.map((heading) => {
                return (
                  <td
                    style={{border: '1px solid white', margin : 0}}
                    colspan={el[heading.colspan] ? el[heading.colspan] : 1}
                    // key={(el[heading.id] ? el[heading.id] : 1) + heading.id}
                  >
                    {el[heading.id] ? el[heading.id] : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
