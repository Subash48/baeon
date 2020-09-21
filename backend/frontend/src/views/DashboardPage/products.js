import React, {useState,useEffect} from 'react';
import ProductItem from './Sections/ProductItem';
import ProductService from '../services/ProductService';
import Message from './Sections/Message';

const Products = props =>{
    const [product,setProduct] = useState({
                                    productName : "",
                                    productDesc : "",
                                    stock : "",
                                    unitPrice : ""
                                });
    const [products,setProducts] = useState([]);
    const [message,setMessage] = useState(null);
    
    useEffect(()=>{
        ProductService.getProducts().then(data =>{
            console.log('here');
            console.log(data);
            setProducts(data.product);
            //console.log(products);
        });
    },[]);

    const onSubmit = e =>{
        e.preventDefault();
        ProductService.postProduct(product).then(data =>{
            //const { message } = data;
            resetForm();
            console.log(data);
            if(!data.msgError){
                ProductService.getProducts().then(getData =>{
                    setProducts(getData.product);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                //authContext.setUser({username : "", role : ""});
                //authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
    }

    const onChange = e =>{
        setProduct({...product,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setProduct({
            productName : "",
            productDesc : "",
            stock :       "",
            unitPrice :   ""
        });
    }

    return(

        // <div>    
        //     <ul className="list-group">
        //         {
        //             products.map(product =>{
        //                 return <ProductItem key={product.id} product={product}/>
        //             })
        //         }
        //     </ul>
        //     <br/>
        //     <form onSubmit={onSubmit}>
        //         <label htmlFor="product">Enter Todo</label>
        //         <input type="text" 
        //                name="productName" 
        //                value={product.productName} 
        //                onChange={onChange}
        //                className="form-control"
        //                placeholder="Product name"/>
        //         <input type="text" 
        //                name="productDesc" 
        //                value={product.productDesc} 
        //                onChange={onChange}
        //                className="form-control"
        //                placeholder="Product description"/>
        //         <input type="text" 
        //                name="stock" 
        //                value={product.stock} 
        //                onChange={onChange}
        //                className="form-control"
        //                placeholder="stock"/>
        //         <input type="text" 
        //                name="unitPrice" 
        //                value={product.unitPrice} 
        //                onChange={onChange}
        //                className="form-control"
        //                placeholder="Please Enter price"/>
        //         <button className="btn btn-lg btn-primary btn-block" 
        //                 type="submit">Submit</button>
        //     </form>
        //     {message ? <Message message={message}/> : null}
        // </div>


        <div>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Dashboard
            </h1>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Info boxes */}
            <div className="row">
              <div className="col-md-3 col-sm-4 col-xs-6">
                <div className="info-box">
                  <span className="info-box-icon bg-aqua"><i className="fa fa-product-hunt" /></span>
                  <div className="info-box-content">
                    <span className="info-box-text"> Products</span>
                    <span className="info-box-number"> 0 </span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-4 col-xs-6">
                <div className="info-box">
                  <span className="info-box-icon bg-red"><i className="fa fa-product-hunt" /></span>
                  <div className="info-box-content">
                    <span className="info-box-text"> Added </span>
                    <span className="info-box-number"> 0</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              {/* fix for small devices only */}
              <div className="clearfix visible-sm-block" />
              <div className="col-md-3 col-sm-4 col-xs-6">
                <div className="info-box">
                  <span className="info-box-icon bg-green"><i className="ion ion-ios-cart-outline" /></span>
                  <div className="info-box-content">
                    <span className="info-box-text">coupons</span>
                    <span className="info-box-number"> 0</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-4 col-xs-6">
                <div className="info-box">
                  <span className="info-box-icon bg-yellow"><i className="ion ion-ios-people-outline" /></span>
                  <div className="info-box-content">
                    <span className="info-box-text"> Retailers </span>
                    <span className="info-box-number"> 0</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            <div className="row">
              {/* Left col */}
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                  </div>
                  {/* /.col */}
                  {/* /.col */}
                </div>
                {/* /.row */}
                {/* TABLE: LATEST ORDERS */}
                <div className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">Latest Orders</h3>
                    <div className="box-tools pull-right">
                      <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                      </button>
                      <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                  <div className="box-footer clearfix">
                    <a href="/" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                    <a href="/" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                  </div>
                 
                </div>
              
              </div>
              <div className="col-md-12">
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">Recently Added Products</h3>
                    <div className="box-tools pull-right">
                      <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                      </button>
                      <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div><form onSubmit={onSubmit}>
              {/* <label htmlFor="product">Enter New Product</label> */}
                 <div className="row">
                 <div className="col-md-4">

                 <input type="text" 
                        name="productName" 
                        value={product.productName} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Product name"/>
                 </div>
                 <div className="col-md-4">
                 <input type="text" 
                        name="productDesc" 
                        value={product.productDesc} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Product description"/>
                  </div>
                  <div className="col-md-4">
                 <input type="text" 
                        name="stock" 
                        value={product.stock} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="stock"/>
                  </div>
                  <div className="col-md-4">
                 <input type="text" 
                        name="unitPrice" 
                        value={product.unitPrice} 
                        onChange={onChange}
                        className="form-control"
                        placeholder="Please Enter price"/>
                  </div>
                  </div>
                 <button className="btn btn-lg btn-primary btn-block" 
                         type="submit">Submit</button>
             </form>
             {message ? <Message message={message}/> : null}
         </div>
                  
                </div>
              </div>  
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title"> YOUR INVENTORY DETAILS </h3>
                    <div className="box-tools pull-right">
                      <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                      </button>
                      <div className="btn-group">
                        <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                          <i className="fa fa-wrench" /></button>
                      </div>
                      <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                    </div>
                  </div>
                     {/* ./box-body */}
                     {/* <div className="box-footer">
                    <div className="row">
                      <div className="col-sm-3 col-xs-6">
                        <div className="description-block border-right">
                          <span className="description-percentage text-green"><i className="fa fa-caret-up" /> 17%</span>
                          <h5 className="description-header">Rs 0</h5>
                          <span className="description-text">COUPONS POSTED</span>
                        </div>
                        {/* /.description-block 
                      </div>
                      {/* /.col 
                      <div className="col-sm-3 col-xs-6">
                        <div className="description-block border-right">
                          <span className="description-percentage text-yellow"><i className="fa fa-caret-left" /> 0%</span>
                          <h5 className="description-header">$0 </h5>
                          <span className="description-text">TOTAL COST</span>
                        </div>
                        {/* /.description-block 
                      </div>
                      {/* /.col 
                      <div className="col-sm-3 col-xs-6">
                        <div className="description-block border-right">
                          <span className="description-percentage text-green"><i className="fa fa-caret-up" /> 20%</span>
                          <h5 className="description-header"> 5 </h5>
                          <span className="description-text">COUPONS COLLECTED</span>
                        </div>
                        {/* /.description-block 
                      </div>
                      {/* /.col */}
                    {/* </div> */}
                    {/* /.row 
                  </div> */}
                  {/* /.box-footer */}
                  {/* /.box-header */}
                  <div className="box-body">
                    <ProductItem products={products}/>
                  </div>
               
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            {/* Main row */}
         
          </section>
         
        </div>
      </div>    
    );

}

export default Products;