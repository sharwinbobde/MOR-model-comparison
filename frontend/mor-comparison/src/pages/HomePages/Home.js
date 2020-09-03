import React from "react";
import '../../styles/GlobalStylesheet.css'

class Home extends React.Component {
  render() {
    return (
      <div className="GenericContainer">
        <h1>Model Comparison Tool for Music Object Recognition</h1><br />

        <p>
          <i>That pretty much sums up what it is.</i>
        </p>
        <p>
          This tool supports TROMPA (Towards Richer Online Music Public-domain Archives) is an international research project, sponsored by the European Union.
        For more information please go <a href="https://trompamusic.eu/">here</a>.
        </p>
      </div>
    )
  }
}

export default Home