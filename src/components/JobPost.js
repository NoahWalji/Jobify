import React, {Component} from "react";

class JobPost extends Component {
  render() {


    // Renders a single Job Post Componenet with Job Titles, Location, Company and Description
    return(
    <a href={this.props.url}>
      <div className="jobPost" id="grow">
        <span id="jobTitle">{this.props.jobTitle}</span>
        <span>{this.props.company} - {this.props.city}, {this.props.state}, {this.props.country}</span>
        <p id="jobLocation"></p>
        <p>{this.props.desc}</p>
      </div>
    </a>
    )
  }

}

export default JobPost;
