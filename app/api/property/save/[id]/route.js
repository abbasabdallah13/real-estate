import User from "@/models/User";
import { connectToDb } from "@/utils/database"

export const PATCH = async(req, { params }) => {
    const { email, wishlistName, property } = await req.json();
    try {
       connectToDb();
       const user = await User.findOne({email});
       let wishlistsNames = user.wishlists.map(wishlist => wishlist.name)
       if(wishlistsNames.indexOf(wishlistName) === -1){
        user.wishlists.push({
            name: wishlistName,
            properties: [{ 
                id: property.id,
                coverPhoto: property.coverPhoto.url,
                price: property.price,
                rentFrequency: property.rentFrequency,
                rooms: property.rooms,
                title: property.title,
                baths: property.baths,
                area: property.area,
                externalID: property.externalID
            }]
        })
       }else{
        user.wishlists.map(wishlist => {
            if(wishlist.name === wishlistName){
                wishlist.properties.push({
                    id: property.id,
                    coverPhoto: property.coverPhoto.url,
                    price: property.price,
                    rentFrequency: property.rentFrequency,
                    rooms: property.rooms,
                    title: property.title,
                    baths: property.baths,
                    area: property.area,
                    externalID: property.externalID
                })
            }
        })
        }
       await user.save()
       return new Response(JSON.stringify(user), { status: 200})
    } catch (error) {
        console.log(error.message)
    }
}