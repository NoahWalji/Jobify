import React, {Component} from "react";
import axios from "axios"
import JobPost from "./JobPost"

class JobPosts extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      search: "",
      latitude: null,
      longitude: null,
      userCity: null,
      userState: null,
      userCountryCode: null,
      indeedData: null,
      locationData: null,
      results: []
    };
    this.getLocation = this.getLocation.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getIndeedData = this.getIndeedData.bind(this);
  }

  getLocation() {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(this.getAddress);
    }

    else {
      alert("Location not supported by browser");
    }
  }

  getAddress(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.state.latitude +","+ this.state.longitude +"&key=" + process.env.REACT_APP_GOOGLE_API_KEY )
      .then(res => {
        this.setState({
          locationData: res.data.results[0].address_components
        });

        for (let i = 0; i < this.state.locationData.length; i++)
        {
          if (this.state.locationData[i].types[0] === "locality")
          {
            this.setState(
              {
                userCity: this.state.locationData[i].long_name
              }
            );
          }

          else if (this.state.locationData[i].types[0] === "administrative_area_level_1")
          {
            this.setState(
              {
                userState: this.state.locationData[i].short_name
              }
            );
          }

          else if (this.state.locationData[i].types[0] === "country")
          {
            this.setState(
              {
                userCountryCode: this.state.locationData[i].short_name
              }
            );
          }

        }
      })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.searchResult = this.state.searchResult;
    this.getIndeedData();

  }

  textChange = (e) => {
    this.setState({searchResult: e.target.value})

  }

  getIndeedData()
  {
    axios.get("https://api.indeed.com/ads/apisearch?publisher=" + process.env.REACT_APP_INDEED_API_KEY + "&v=2&format=json&q="+ this.state.searchResult + "&l="+ this.state.userCity +
    "%2C+"+ this.state.userState + "&co=" + this.state.userCountryCode + "&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&limit=25")
    .then(res => {
      this.setState({
        results: res.data.results

      })
    });
  }

  componentDidMount(){
    this.getLocation();

  }

  render()
  {
    this.posts = this.state.results.map((post, key) =>
      <JobPost jobKey={post.jobkey} jobTitle = {post.jobtitle} company = {post.company} city = {post.city} state = {post.state} country = {post.country} desc = {post.snippet}
      url = {post.url} />
    );

    return(
      <div>
        <form onSubmit={this.onSubmit}>
            <input type="text" id="searchBar" placeholder="Search for a job near you..." onChange={this.textChange}/>
        </form>
        {this.posts}
      </div>
      )
  }
}

export default JobPosts;
