import React, {Component} from "react";
import axios from "axios"
import JobPost from "./JobPost"
import NoJobs from "./NoJobs"

class JobPosts extends Component {

  // Job Post Constructor
  constructor(props)
  {
    super(props);
    this.state = {
      searchTerm: undefined, // Search Term From User
      results: []           // Results Taken From Job Sites
    };

    // Binding Functions to this
    this.getIndeedData = this.getIndeedData.bind(this);
  }


  // Function that takes Location Data as well as the search Term given by the user to get Job Data from "INDEED"
  // Sets the state of Results with Job Objects
  getIndeedData = () =>
  {

    axios.get("https://api.indeed.com/ads/apisearch?publisher=" + process.env.REACT_APP_INDEED_API_KEY + "&v=2&format=json&q="+ this.state.searchTerm + "&l="+ this.props.userCity +
    "%2C+"+ this.props.userState + "&co=" + this.props.userCountryCode + "&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&limit=25")
    .then(res => {
      this.setState({
        results: res.data.results

      })
    });
  }

  // When the user enters data into the search bar, the state of the search term is updated.
  textChange = (e) => {
    this.setState({searchTerm: e.target.value})
    console.log(this.state.searchTerm);
  }

  // When the user hits enter to search a job, the final search term is used and runs functions to get job data
  onSubmit = (e) => {
    e.preventDefault()
    this.setState({searchTerm: e.target.value})
    this.getIndeedData();

  }

  // Render To Page Method:
  render()
  {
    // Maps The Results To a variable "posts" with each object in its own "post"
    // Then returns a Job Post Component with job details as its prop.
    this.posts = this.state.results.map((post, key) =>
      <JobPost jobKey={post.jobkey} jobTitle = {post.jobtitle[0].toUpperCase() + post.jobtitle.slice(1)} company = {post.company} city = {post.city} state = {post.state} country = {post.country} desc = {post.snippet}
      url = {post.url} />
    );
    console.log(this.posts)

    // Main Return Produces the Search Bar, and when Posts are searched for produces the list of mapped posts
    return(
      <div className="searchBox">
            <form onSubmit={this.onSubmit}>
                <input type="text" id="searchBar" placeholder="Search for a job near you..." onChange={this.textChange}/>
            </form>
        {this.posts}
      </div>
      )
  }
}

export default JobPosts;
