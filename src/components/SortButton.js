import React, {Component} from "react";

class SortButton extends Component {
  render() {
    return(<button onClick={this.props.myClick} className="sortButton">Sort By: {this.props.name}</button>)
  }

}

export default SortButton;
