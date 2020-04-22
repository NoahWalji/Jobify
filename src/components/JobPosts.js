import React, {Component} from "react";
import axios from "axios"
import JobPost from "./JobPost"

class JobPosts extends Component {

  // Job Post Constructor
  constructor(props)
  {
    super(props);
    this.state = {
      userCity: this.props.userCity,
      searchTerm: undefined, // Search Term From User
      indeedResults: [],           // Results Taken From Indeed
      glassdoorResults: []        // Results Taken From GlassDoor
    };

    // Binding Functions to this
    this.getJobData = this.getJobData.bind(this);
  }


  // Function that takes Location Data as well as the search Term given by the user to get Job Data
  // Sets the state of Results with Job Objects
  getJobData = () =>
  {
    axios.get("http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=" + process.env.REACT_APP_GLASSDOOR_PARTNER_ID + "&t.k=" + process.env.REACT_APP_GLASSDOOR_PARTNER_KEY +
    "&action=jobs&q="+ this.state.searchTerm + "&city=" + this.state.userCity)
    .then(res => {
      this.setState({
        glassdoorResults: res.data.response.jobListings

      })
    });

    axios.get("https://api.indeed.com/ads/apisearch?publisher=" + process.env.REACT_APP_INDEED_API_KEY + "&v=2&format=json&q="+ this.state.searchTerm + "&l="+ this.state.userCity +
    "%2C+"+ this.props.userState + "&co=" + this.props.userCountryCode + "&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&limit=25")
    .then(res => {
      this.setState({
        indeedResults: res.data.results

      })
    });
  }

  // When the user enters data into the search bar, the state of the search term is updated.
  textChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  }

  // When the user hits enter to search a job, the final search term is used and runs functions to get job data
  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "userCity" && e.target.value === undefined)
    {
      this.setState({userCity: this.props.userCity})
    }
    this.getJobData();

  }

  // Render To Page Method:
  render()
  {
    // Maps The Results from Indeed To a variable "indeedPosts" with each object in its own "post"
    // Then returns a Job Post Component with job details as its prop.
    this.indeedPosts = this.state.indeedResults.map((post, key) =>
      <JobPost jobKey={post.jobkey} jobTitle = {post.jobtitle[0].toUpperCase() + post.jobtitle.slice(1)} company = {post.company} city = {post.city}
        state = {post.state} country = {post.country} desc = {post.snippet}
      url = {post.url} />
    );

    // Maps The Results from Glassdoor To a variable "glassdoorPosts" with each object in its own "post"
    // Then returns a Job Post Component with job details as its prop.
    this.glassdoorPosts = this.state.glassdoorResults.map((post, key) =>
      <JobPost jobKey={post.jobListingId} jobTitle = {post.jobTitle[0].toUpperCase() + post.jobTitle.slice(1)} company = {post.employer.name}
        city = {post.location} state = {this.props.userState} country = {this.props.userCountryCode} desc = {post.descriptionFragment}
      url = {"http://glassdoor.com" + post.jobViewUrl} />
    );

    // Creates a new array that concatenates all the job sites results
    this.jobPosts = this.indeedPosts.concat(this.glassdoorPosts);

    // Sorts the results alphabetically
    this.jobPosts.sort((a, b) => (a.props.jobTitle > b.props.jobTitle) ? 1 : -1)

    // Main Return Produces the Search Bar, and when Posts are searched for produces the list of mapped posts
    return(
      <div className="searchBox">
            <form onSubmit={this.onSubmit}>

                <input type="text" className="search" id="searchBar" name="searchTerm" placeholder="Search for a job near you..." onChange={this.textChange}
                onKeyDown={(e) => (e.code===13) ? this.onSubmit : null }/>

                <input type="text" className="search" id="locationBar" name="userCity" placeholder={this.props.userCity} onChange={this.textChange}
                onKeyDown={(e) => (e.code===13) ? this.onSubmit : null }/>
                <input type="submit" value="Submit" />
            </form>
        {this.jobPosts}
      </div>
      )
  }
}

export default JobPosts;
