const Options = (props: any) => {
  const options = [
    {
      name: "Create Module",
      handler: props.actionProvider.handleGlobalStats,
      id: 1,
    },
    {
      name: "Create Router",
      handler: props.actionProvider.handleLocalStats,
      id: 2,
    },
    {
      name: "About Feature",
      handler: props.actionProvider.handleContact,
      id: 3,
    },
    {
      name: "Create Query",
      handler: props.actionProvider.handleMedicine,
      id: 4,
    },
  ];

  return (
    <div className="options">
      <h1 className="options-header">{props.title}</h1>
      <div className="options-container">
        {options.map((option: any) => {
          return (
            <div
              className="option-item"
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
