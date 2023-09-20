import { NextResponse } from "next/server";
import User from "../../../../model/user.model";
import Product from "../../../../model/products.model";
import Store from "../../../../model/store.models";
import { cookies } from "next/headers";
import _ from "lodash";
import { createDBConnection } from "@/db/conn";

export const GET = async () => {
  try {
    createDBConnection();
    let user_id = cookies().get("incomming_user").value;
    const id = await User.find({ _id: user_id }, { user_id: 1 });
    const store_id = await Store.find({ user_id: _.get(id, "[0]._id", "") });
    const products_one_store = await Product.find({ store_id: store_id });
    return NextResponse.json({ data: products_one_store }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
