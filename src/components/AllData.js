import React from "react";
import "../App.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Edit from "./Edit";
import NewData from "./NewData";

class AllData extends React.PureComponent {
  state = {
    start: 0,
    counter: 10,
    allData: this.props.data.length,
    openModal: false,
    page: "",
    id: "",
  };

  nextButton(num) {
    const {start, counter} = this.state;
    const sumStart = start + 10;
    const sumCounter = counter + 10;
    if (this.state.start >= this.state.allData) {
      return null;
    } else {
      this.setState({start: sumStart, counter: sumCounter});
    }
  }
  prevButton(num) {
    const {start, counter} = this.state;
    const sumStart = start - 10;
    const sumCounter = counter - 10;
    if (this.state.start === 0) {
      return null;
    } else {
      this.setState({start: sumStart, counter: sumCounter});
    }
  }

  modalOpened(setModal, page, id) {
    if (page) {
      this.setState({page: page});
    }
    if (id) {
      this.setState({id: id});
    }
    if (setModal === "open") {
      this.setState({openModal: true});
    } else if (setModal === "close") {
      this.setState({openModal: false});
    }
  }

  showModal() {
    if (this.state.page === "añadir") {
      return (
        <Modal
          show={this.state.openModal}
          onHide={() => this.modalOpened("close")}
        >
          <Modal.Header closeButton>
            <Modal.Title>Añadir datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewData
              onHide={(setModal) => this.modalOpened(setModal)}
              {...this.props}
            />
          </Modal.Body>
        </Modal>
      );
    } else if (this.state.page === "editar") {
      return (
        <Modal
          show={this.state.openModal}
          onHide={() => this.modalOpened("close")}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Edit
              onHide={(setModal) => this.modalOpened(setModal)}
              {...this.props}
              id={this.state.id}
              data={this.props.data}
            />
          </Modal.Body>
        </Modal>
      );
    }
  }

  render() {
    const {allData} = this.state;

    const allDataInfo = !this.props.data.length ? (
      <Spinner animation="border" />
    ) : (
      this.props.data.map((item, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>{item.consumo}</td>
              <td>{item.precio}</td>
              <td>{item.coste}</td>
              <Button
                variant="outline-info"
                className="button"
                onClick={() => this.modalOpened("open", "editar", item._id)}
              >
                Editar
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => this.props.deleteItem(item._id)}
              >
                Eliminar
              </Button>
            </tr>
          </tbody>
        );
      })
    );

    return !this.props.data.length ? (
      <Spinner animation="border" />
    ) : (
      <div className="AllData">
        <h1>Datos de facturación eléctrica</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Consumo (Wh)</th>
              <th>Precio (€/kWh)</th>
              <th>Coste por hora (€)</th>
            </tr>
          </thead>
          {allDataInfo.slice(this.state.start, this.state.counter)}
        </Table>

        <div className="pagination">
          <Button variant="secondary" onClick={() => this.prevButton(10)}>
            ←
          </Button>
          <div>
            <b>{allData - this.state.start} items</b>
          </div>
          <Button variant="secondary" onClick={() => this.nextButton(10)}>
            →
          </Button>
        </div>

        <Button
          variant="outline-success"
          className="addButton"
          onClick={() => this.modalOpened("open", "añadir")}
        >
          Añadir datos
        </Button>
        {this.showModal()}
      </div>
    );
  }
}

export default AllData;
