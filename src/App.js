import './App.scss';
import React from 'react';
import axios from 'axios'
import {Switch, Route} from 'react-router-dom'
import Edit from './components/Edit'
import AllData from './components/AllData'
import NewData from './components/NewData'

class App extends React.Component {
  
  state = {
    data: ''
  }

  allDataUpdate(){
    axios({
      method: 'get',
      url: `http://localhost:5000/electric/all-data`
    })
    .then((result)=>{
      this.setState({data: result.data})
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  componentDidMount(){
    this.allDataUpdate()
  }

  deleteItem(id){
    axios({
      method: 'post',
      url: `http://localhost:5000/electric/delete-data/${id}`
    })
    .then((result) =>{
      const deletedItem = result.data._id
      const newItems = this.state.data.filter((item)=>{
        return item._id !== deletedItem
      })
      this.setState({data: newItems})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render(){
    const {data} = this.state
    return (
      <div className="App">
         <Switch>
         <Route exact path='/'  component={()=> <AllData data={data} deleteItem={(id)=> this.deleteItem(id)} allDataUpdate={()=> this.allDataUpdate()} />} />
        <Route exact path='/edit-item/:_id'  component={()=> <Edit data={data} allDataUpdate={()=> this.allDataUpdate()} />} />
        <Route exact path='/new-data/'  component={()=> <NewData  data={data} allDataUpdate={()=> this.allDataUpdate()} />} />
         </Switch>
      </div>
    );
  }
}

export default App;
