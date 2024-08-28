import { useEffect, useRef, useState } from "react";
import api from '../../services/api'
import Alterar from "./alterar";
import toast from 'react-hot-toast';

export default function Products() {

  const [products, setProducts] = useState();

  // Lista todos os produtos cadastrados
  async function getProducts() {
    const {data} = await api.get('/produtos')
    setProducts(data)
  }

  // Lista todos os produtos ao carregar a página
  useEffect(() => {
    getProducts()
  }, [])
  
  // Recebe campos do produto
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  // Cadastrar produto
  async function handleSubmit(event) {
    event.preventDefault()
    try{
      await api.post('/produtos', {
        productname: nameRef.current.value,
        productdesc: descriptionRef.current.value,
        productprice: parseInt(priceRef.current.value)
      })
      toast.success('Produto cadastrado com sucesso!', {position:'top-center'})
      event.target.reset()
      getProducts()
    }catch(error){
      toast.success('Erro ao cadastrar produto.', {position:'top-center'})
    }
  }

  // Deletar produto
  async function deleteProducts(id) {
    try{
      await api.delete(`/produtos/${id}`)
      toast.success('Produto deletado com sucesso!', {position:'top-center'})
      getProducts()
    }catch(error){
      toast.success('Não foi possível deletar o produto!', {position:'top-center'})
    }
  }

  return (
    <>
      <h3>Cadastro de Produtos</h3>
      <form id="productform" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="productname">Nome*:</label>
          <input name="name" id="productname" ref={nameRef} placeholder="Informe o nome do produto" className="form-control" type="text" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="productdesc">Descrição*:</label>
          <input name="description" id="productdesc" ref={descriptionRef} placeholder="Informe a descrição do produto" className="form-control" type="text" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="productprice">Valor*:</label>
          <input name="price" id="productprice" ref={priceRef} placeholder="Informe o valor do produto" className="form-control" type="number" required />
        </div>
        <button className="btn btn-success" type="submit">Cadastrar</button>
      </form>
      <div className="table-responsive custom-table-responsive">
        <table className="table custom-table">
          <thead>
            <tr>
              <th scope="col">Código do produto</th>
              <th scope="col">Nome do produto</th>
              <th scope="col">Descrição do produto</th>
              <th scope="col">Preço do produto</th>
              <th scope="col">Editar/Deletar</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 && products.map(item => (
              <>
                <tr key={item.id} scope="row">
                  <td>{item.id}</td>
                  <td>{item.productname}</td>
                  <td>{item.productdesc}</td>
                  <td>{item.productprice}</td>
                  <td>
                    <span className="pull-right btn-group col-md-1">
                      <Alterar id={item.id} productname={item.productname} productdesc={item.productdesc} productprice={item.productprice} updateProducts={getProducts}/>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteProducts(item.id)}>Deletar</button>
                    </span>
                  </td>
                </tr>
                <tr className="spacer"><td colSpan="100"></td></tr>
              </>
            ))}
          </tbody>
        </table>
      </div >
    </>
  );
}