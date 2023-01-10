import ProductService from "./product.index.js";

const ProductController = {
  getproducts: async (req, res) => {
    const products=await ProductService.getProducts()
    res.json(products)
  },

  getproduct: async (req, res) => {
    const id=req.params.id
    const product=await ProductService.getProduct(id)
    return res.status(200).json({
      product      
    })
  },
  deleteImage:async(req,res)=>{
    const {image,id}=req.params
    const resp=await ProductService.deleteImage(image,id)
    return res.status(200).json({
      resp
    })
  },

  addproduct: async (req, res) => {
    const image=req.files[0].filename;
    const { user } = req;
    const data=req.body
    if(user.role!=="admin"){
        return res.status(200).json({
            message:"Not Authorized"
        });
    }else{
        const addedProduct=await ProductService.addProduct({...data,image})
        return res.status(200).json({
          message:"Product Saved",
          addedProduct
        });
    }
  },

  editproduct: async (req, res) => {
    const id=req.params
    const data=req.body
    const editedProduct=await ProductService.editProduct(data,id)
    res.json({
      message: "Product Updated",
      editedProduct
    });
  },

  editproducti: async (req, res) => {
    const image=req.files[0].filename;
    const id=req.params
    const data=req.body
    const editedProducti=await ProductService.editProducti({...data,image},id)
    res.json({
      message: "Product Updated",
      editedProducti
    });
  },

  deleteproduct: async (req, res) => {
    const id=req.params
    const product=await ProductService.deleteProduct(id)
    return res.status(200).json({
      product      
    })
  },

  searchProducts:async(req,res)=>{
    const {search}=req.query
    let filters=search
    filters = filters && filters !== '' ? {name :{$regex : filters, $options: "$i"}}  : {}
    const products=await ProductService.searchProducts(filters)
    return res.status(200).json({
      products
    })
  },

  productbycategory:async(req,res)=>{
    const {category}=req.params
    const products=await ProductService.getProductsByCategory(category)
    return res.status(200).json({
      products
    })
  }
};
export default ProductController
