import React, {Component} from "react";

class JobPost extends Component {

  render()
  {
    let results;
    if(this.props.results)
    {
      results = this.props.results;
      console.log()
    }

    return(
      <div>
        <h1>{results ? results[0][0].jobtitle: null}</h1>

      </div>
    )
  }


}

export default JobPost;
