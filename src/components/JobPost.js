import React, {Component} from "react";

class JobPost extends Component {
  constructor(props)
  {
    super(props);
  };

  render() {
    return(
      <div className="jobPost">
        <h1>{this.props.jobTitle}</h1>
        <p>{this.props.company}</p>

      </div>
    )
  }

}

export default JobPost;
