import mongoose from "mongoose";
import User from "@/models/User";
import { connectToDb } from "@/utils/database";

export const PATCH = async(req,res) => {
    try {
        connectToDb();
        const { email, wishlistName } = await req.json();
        const user = await User.findOne({ email });
        user.wishlists.map((wishlist, i) => {
            if(wishlist.name === wishlistName){
                user.wishlists.splice(i, 1)
            }
        })
        await user.save()
        return new Response( JSON.stringify(user), { status: 200 } )
    } catch (error) {
        console.log(error.message)
    }
}