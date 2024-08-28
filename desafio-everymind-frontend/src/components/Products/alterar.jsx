import { useState, useRef } from 'react';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';

function Alterar(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nameEditRef = useRef();
    const descriptionEditRef = useRef();
    const priceEditRef = useRef();

    // Editar produto
    async function editProducts(id) {
        event.preventDefault()
        if(!nameEditRef.current.value || !descriptionEditRef.current.value || !priceEditRef.current.value){
            toast.error('Todos os campos são obrigatórios!', {position:'top-center'})
        }else{
            try {
                await api.put(`/produtos/${id}`, {
                    productname: nameEditRef.current.value,
                    productdesc: descriptionEditRef.current.value,
                    productprice: parseInt(priceEditRef.current.value)
                })
                toast.success('Produto alterado com sucesso!', {position:'top-center'})
                props.updateProducts()
                handleClose()
            } catch (error) {
                toast.error('Erro ao alterar produto!', {position:'top-center'})
                handleClose()
            }
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}


            <button className="btn btn-sm btn-dark" onClick={handleShow}>Editar</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="productform">
                        <div className="form-group mb-3">
                            <label htmlFor="productname" className='modalTextColor'>Nome*:</label>
                            <input name="nameEdit" id="productname" ref={nameEditRef} defaultValue={props.productname} placeholder="Informe o nome do produto" className="form-control" type="text" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="productdesc" className='modalTextColor'>Descrição*:</label>
                            <input name="descriptionEdit" id="productdesc" ref={descriptionEditRef} defaultValue={props.productdesc} placeholder="Informe a descrição do produto" className="form-control" type="text" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="productprice" className='modalTextColor'>Valor*:</label>
                            <input name="priceEdit" id="productprice" ref={priceEditRef} defaultValue={props.productprice} placeholder="Informe o valor do produto" className="form-control" type="number" required />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={() => editProducts(props.id)}>Alterar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Alterar;