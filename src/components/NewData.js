import React from 'react'
import '../App.scss';
import axios from 'axios'
import Button from 'react-bootstrap/Button'

class NewData extends React.PureComponent{
    state={}    
     componentWillUnmount(){
        this.props.allDataUpdate()
      }  
    newItem(){
        axios({
          method: 'post',
          url: `http://localhost:5000/electric/new-data`,
          data: {
            fecha: this.state.fecha,
            hora: this.state.hora,
            consumo: this.state.consumo,
            precio: this.state.precio,
            coste: this.state.coste
          }
        }) 
        .then((result) =>{
          this.setState({...this.state}) 
        })
        .catch((error) => {
          console.log(error)
        })
      }
    
    handleSubmit(event) {
    event.preventDefault()
    this.newItem()
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }); 
  }
  
    render(){
      const style = {padding: '0px'}
        return (
            <div className="editItem">
                <form onSubmit={(event)=> this.handleSubmit(event)}>
                
                <label >Fecha: </label>
                <input type="text" name="fecha" id="fecha" onChange={(event)=>this.handleInput(event)} />
                
                <label >Hora: </label>
                <input type="number" name="hora" id="hora" onChange={(event)=>this.handleInput(event)} />
                
                <label >Consumo (Wh): </label>
                <input type="number" name="consumo" id="consumo" onChange={(event)=>this.handleInput(event)} />
                
                <label >Precio (€/kWh): </label>
                <input type="text" name="precio" id="precio" onChange={(event)=>this.handleInput(event)} />
                
                <label >Coste por hora (€): </label>
                <input type="text" name="coste" id="coste" onChange={(event)=>this.handleInput(event)} />
                
                <Button variant="outline-success" style={style}><button className="addButtonModal" onClick={()=> this.props.onHide('close')} >Añadir</button></Button>
                </form>
            </div>
        )
    }
}
export default NewData