import React, {Component} from "react";
import JobPost from "./JobPost"
import axios from "axios"

class JobPosts extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userCity: null,
      userState: null,
      userCountryCode: null,
      indeedData: null,
      locationData: null,
      results: null
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
              }, () => {
                this.getIndeedData();
                }
            );
          }

        }
      })
  }

  getIndeedData()
  {
    axios.get("https://api.indeed.com/ads/apisearch?publisher=" + process.env.REACT_APP_INDEED_API_KEY + "&v=2&format=json&q=java&l="+ this.state.userCity + "%2C+"+ this.state.userState + "&co=" + this.state.userCountryCode + "&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29")
    .then(res => {
      this.setState({
        results: [res.data.results]
      })
    });

  }

  componentDidMount(){
    this.getLocation();

  }
  render()
  {
    return(
      <div>
        <JobPost results={this.state.results}/>
      </div>
      )
  }
}

export default JobPosts;
