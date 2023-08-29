import User from "@/models/User";
import { connectToDb } from "@/utils/database"

export const PATCH = async(req, { params }) => {
    const { email } = await req.json();
    const { id } = params;
    try {
       connectToDb();
       const user = await User.findOne({email});
       user.wishlists.map(wishlist => {
        wishlist.properties.map((property, i) => {
            if(property.id.toString() === id.toString() ){
                wishlist.properties.splice(i,1)
            }
        })
       })
       await user.save()
       return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error.message)
    }
}