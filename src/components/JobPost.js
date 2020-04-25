import React, {Component} from "react";

class JobPost extends Component {
  render() {


    // Renders a single Job Post Componenet with Job Titles, Location, Company and Description
    return(
    <a href={this.props.url}>
      <div className="jobPost" id="grow">
        <div className="jobPostText">
          <span className="jobTitle">{this.props.jobTitle}</span>
          <span className="jobCompany">{this.props.company} - {this.props.city}, {this.props.state}, {this.props.country}</span>
          <p>{this.props.desc}</p>
          <p>Source: {this.props.from}</p>
        </div>
      </div>
    </a>
    )
  }

}

export default JobPost;
