
const ListDisplay = ({ Array }) => {
  return (
    <>
      <div className="currentListContainer wrapper">
        {Array.map((i) => (
          <div className="showContainer" key={i[0]}>
            <div className="imgContainer">
              {i[1][2] === null ? (
                <img
                  src="./assets/no-img-portrait-text.png"
                  alt="Nothing to show"
                />
              ) : (
                <img src={i[1][2]} alt={`TV poster for ${i[1][0]}`} />
              )}
              <h2>{i[1][0]}</h2>
              <p>
                Premiered: {i[1][3] === null ? 'N/A' : i[1][3]} - Ended:{' '}
                {i[1][4] === null ? 'N/A' : i[1][4]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListDisplay;
