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

  constructor() {
    super();

    this.state = {
      data: {},
      error: {},
      isLoading: false
    };
  }

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
        isLoading?
          <div className="loading">
            <CircularProgress />
          </div>
          :
          null
        }
          
        <div>
          {
            (this.state.error && this.state.error.fields) ?
              this.state.error.fields.map( (field) => {
                  return (
                    <div className="error">
                      <Paper elevation={2} key={field.field}>
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
                    <div className="error">
                      <Paper elevation={2} key={idx}>
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
