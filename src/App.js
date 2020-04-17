import React, {Component} from 'react';
import BigName from './components/BigName'
import JobPosts from './components/JobPosts'
import ReactLoading from "react-loading";
import axios from "axios"

//================
//  MAIN METHOD
//================

class App extends Component {
  // Job Post Constructor
  constructor(props)
  {
    super(props);
    this.state = {
      loading: undefined,    // If Loading Location is Done
      latitude: undefined,   // Latitude of Users Location
      longitude: undefined,  // Longitude of Users Location
      userCity: undefined,   // Users City
      userState: undefined,  // Users State
      userCountryCode: undefined, // Users Country in Short Form (CA or USA)
      locationData: undefined,    // Location Object
    };

    // Binding Functions to this
    this.getLocation = this.getLocation.bind(this);
    this.getAddress = this.getAddress.bind(this);
  }

  // Once Component Maps, begin location process by running the getLocation function
  componentDidMount(){
    this.getLocation();

  }

  // Gets the Users Current Location, and passes it to getAddress Function to get specific data (Uses Navigator)
  // TODO: Allow users to insert other location
  getLocation() {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(this.getAddress);
    }

    else {
      alert("Location not supported by browser");
    }
  }

  // Takes Users Location Data and gets the exact longitude and latitude (sets states).
  // Then uses Googles Geo API to and passes Long/Lat to get specific location data (City, State/Province, Country) and updates states
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
      }, 1200)
      .then(res => {
        this.setState({done: "True"})
      }, 1200)
  }
  // Returns the Main Div with the Jobify Name Componenet and the Job Posts Componenet
  render() {
    return(
      <div className="App">
        {!this.state.done ? (
          <div className="Loading">
            <ReactLoading type={"balls"} color={"black"} height={'10%'} width={'10%'} />
          </div>
          ) : (
          <div className="container">
            <BigName/>
            <JobPosts latitude={this.state.latitude} longitude={this.state.longitude} userCity={this.state.userCity} userState={this.state.userState} userCountryCode={this.state.userCountryCode}/>
          </div>
      )}
      </div>
    )
  }


}

export default App;
