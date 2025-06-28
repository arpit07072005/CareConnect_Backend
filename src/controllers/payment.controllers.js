
import { asyncHandler } from "../utils/asyncHandle.js";
import Razorpay from "razorpay";


const paymentcontroller = asyncHandler(async(req , res )=>{
try{
  const instance = new Razorpay({
    key_id:"rzp_live_D0LI2klGS3xY8S",
      key_secret:"sZBDkCVvWMzXSXzh0pQC0ho0"
  })

  const{order_id,amount,payment_capture,currency}=req.body
  const options = {
    amount:amount*100,
    currency:currency,
    receipt:order_id,
    payment_capture:payment_capture
  }

  const order = await instance.orders.create(options);
  if(!order)return res.status(500).send("something occured");

  res.status(200).json({success:true,data:order})
}catch(error){
    console.log(error)
}

})

const carddetail = asyncHandler(async(req,res)=>{
  try{
    const instance = new Razorpay({
      key_id:"rzp_live_D0LI2klGS3xY8S",
      key_secret:"sZBDkCVvWMzXSXzh0pQC0ho0"
    })
  
    const{id}=req.body
    
  
    const order = await instance.payments.fetch(id);
    if(!order)return res.status(500).send("something occured");
  
    res.status(200).json({success:true,data:order})
  }catch(error){
      console.log(error)
  }
  
})

export {paymentcontroller,carddetail}