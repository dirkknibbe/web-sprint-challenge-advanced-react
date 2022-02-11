import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    matrix: [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
    steps: 0,
    x: 2,
    y: 2,
    email: "lady@gaga.com",
  };

  componentDidMount() {
    axios
      .post(`http://localhost:9000/api/result`, this.state.email)
      .then((resp) => {
        console.log(resp);
        // this.setState({
        //    ...this.state,
        //    email: resp.data.message
        // })
      })
      .catch((err) => {
        console.log(err);
      });

    // handleLeftClick = (e) => {
    //   e.preventDefault();
    //   this.setState({
    //     ...this.state,
    //   });
    // };
  }

  render() {
    console.log(this.state);
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({className.coordinates})</h3>
          <h3 id="steps">You moved {className.steps} times</h3>
        </div>
        <div id="grid">
          {this.state.matrix.map((row) => {
            return (
              <>
                {row.map((item) => {
                  return (
                    <>
                      {item ? (
                        <div className="square active">B</div>
                      ) : (
                        <div className="square"></div>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>

        <div className="info">
          <h3 id="message">{}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleLeftClick} id="left">
            LEFT
          </button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
