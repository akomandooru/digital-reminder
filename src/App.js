import React from "react";
import ReactFormValidation from "react-form-input-validation";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        loc:"",
        name: "",
        time: "",
        dur:""
      },
      errors: {},
      qrcode:""
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      loc: "required|max:32",
      name: "required|max:32",
      time: "required",
      dur: "required|integer"
    });

    this.form.onformsubmit = (fields) => {
      console.log(JSON.stringify(fields));
      fetch('/api/appointments',{method:'POST', body:JSON.stringify(fields)})
      .then(response => { 
        console.log(response);
        return response.blob()})
      .then(image => {
          console.log(image);
          // Create a local URL of that image
          const localUrl = URL.createObjectURL(image);
          console.log(localUrl);
          this.setState({qrcode:localUrl});
      });
    }
  }

  render() {
    return (
        <div style={{maxWidth: "600px", margin: "0 auto"}}>
          <h3>Digital Appointment Reminder</h3>
          <form
            className="myForm"
            noValidate
            autoComplete="off"
            onSubmit={this.form.handleSubmit}
          >
            <p>
              <label>
                Appointment Location
                <input
                  type="text"
                  name="loc"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.loc}
                  // To override the attribute name
                  data-attribute-name="Appointment Location"
                  data-async
                />
              </label>
              <label className="error">
                {this.state.errors.loc
                  ? this.state.errors.loc
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Event Description
                <input
                  type="text"
                  name="name"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.name}
                  // To override the attribute name
                  data-attribute-name="Event Description"
                  data-async
                />
              </label>
              <label className="error">
                {this.state.errors.name
                  ? this.state.errors.name
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Appointment Time (EST)
                <input
                  type="datetime-local"
                  name="time"
                  onChange={this.form.handleChangeEvent}
                  onBlur={this.form.handleBlurEvent}
                  value={this.state.fields.time}
                />
              </label>
              <label className="error">
                {this.state.errors.time
                  ? this.state.errors.time
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Appointment Duration (min)
                <input
                  type="text"
                  name="dur"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.dur}
                  // To override the attribute name
                  data-attribute-name="Duration"
                  data-async
                />
              </label>
              <label className="error">
                {this.state.errors.dur
                  ? this.state.errors.dur
                  : ""}
              </label>
            </p>

            <p>
              <button type="submit">Create QR Code</button>
            </p>
          </form>
          <img src={this.state.qrcode} alt="qr code" height="30%" width="30%"/>
        </div>
    );
  }
}

export default App;
