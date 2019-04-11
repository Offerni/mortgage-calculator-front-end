import React, { Component } from 'react';
import FormComponents from './FormComponent';
import TableComponent from './TableComponent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../Styles/Components.css';

class App extends Component {

  /**
   * create an empty state to populate the fields with all the data from the back end.
   */
  constructor() {
    super();
    this.state = {
      data: {},
      error: {},
      isLoading: false
    };
  }

/**
 * function to handle the promisses and data on both ways
 * isLoading is a flag to show or hide the loading animation
 * @param info: expected info from the state
 */
  submit = (info) => {
    this.setState({
      error: {},
      data: {},
      isLoading: true
    })
    fetch('http://127.0.0.1:8000/api/calculator', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then (data =>  {
      if(data.error) {
        this.setState({
          error: data.error,
          isLoading: false
        })
      } else {
        this.setState({isLoading: false})
        this.setState({data});
      }
      
    })
    .catch(err => console.log(err));
  }

  render() {
    let {isLoading} = this.state;
    return (
      <div className="App">
          <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                    Mortgage Calculator
                </Typography>
              </Toolbar>
          </AppBar>
        <FormComponents onSubmit={this.submit} />
        <TableComponent data={this.state.data}/>
        {
          //Show loading Animation
        isLoading?
          <div className="loading">
            <CircularProgress />
          </div>
          :
          null
        }
          
        <div>
          {
            // there're two types of erros coming from the back end
            (this.state.error && this.state.error.fields) ?
              this.state.error.fields.map( (field) => {
                  return (
                    <div key={field.field} className="error">
                      <Paper elevation={2} >
                      <ErrorIcon />
                      <Typography component="p">
                        {field.message}
                        </Typography>
                      </Paper>
                    </div>
                    
                  )
              })
            :
              null
          }

          {
            (this.state.error && this.state.error.messages) ?
              this.state.error.messages.map ((message, idx) => {
                return (
                    <div key={idx} className="error">
                      <Paper elevation={2} >
                        <ErrorIcon />
                        <Typography component="p">
                          {message}
                        </Typography>
                      </Paper>
                    </div>                  
                )
              })
            :
            null
          } 
        </div>
      </div>
    );
  }
}

export default App;
