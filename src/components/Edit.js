import React from 'react'
import '../App.scss';
import axios from 'axios'
import Button from 'react-bootstrap/Button'

class Edit extends React.PureComponent{
    state={
      id: this.props.id
    }

    componentWillUnmount(){
        this.props.allDataUpdate()
      }     

    editItem(id){
        axios({
          method: 'post',
          url: `http://localhost:5000/electric/edit-data/${id}`,
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
    this.editItem(this.state.id)
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }); 
  }

    render(){
      const style = {padding: '0px'}
    const {data} = this.props
        const paramsItem = this.props.id
        const selectedItem = !data.length ? <p>loading..</p> : data.filter((item)=>{
            return item._id === paramsItem
        })[0] 
        return (
            <div className="editItem">
                <form onSubmit={(event)=> this.handleSubmit(event)}>
                
                <label >Fecha: </label>
                <input type="text" name="fecha" id="fecha" defaultValue={selectedItem.fecha} onChange={(event)=>this.handleInput(event)} />
                
                <label >Hora: </label>
                <input type="number" name="hora" id="hora" defaultValue={selectedItem.hora} onChange={(event)=>this.handleInput(event)} />
                
                <label >Consumo (Wh): </label>
                <input type="number" name="consumo" id="consumo" defaultValue={selectedItem.consumo} onChange={(event)=>this.handleInput(event)} />
                
                <label >Precio (€/kWh): </label>
                <input type="text" name="precio" id="precio" defaultValue={selectedItem.precio} onChange={(event)=>this.handleInput(event)} />
                
                <label >Coste por hora (€): </label>
                <input type="text" name="coste" id="coste" defaultValue={selectedItem.coste} onChange={(event)=>this.handleInput(event)} />
                
                <Button variant="outline-success" style={style} onClick={()=> this.props.onHide('close')} ><button>Editar</button></Button>
                </form>
            </div>
        ) 
    }
}
export default Edit