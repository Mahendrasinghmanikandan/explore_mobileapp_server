import { NextResponse } from "next/server";
import User from "../../../model/user.model";
import Product from "../../../model/products.model";
import Store from "../../../model/store.models";
import { cookies } from "next/headers";
import { createDBConnection } from "@/db/conn";
import _ from "lodash";

export const POST = async (request) => {
  try {
    createDBConnection();
    let user_id = cookies().get("incomming_user").value;
    const id = await User.find({ _id: user_id }, { user_id: 1 });
    const store_id = await Store.find({ user_id: _.get(id, "[0]._id", "") });
    let formData = await request.json();
    formData.store_id = _.get(store_id, "[0]._id", "");
    await Product.create(formData);
    return NextResponse.json({ message: "Product Added" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    createDBConnection();
    const products_all = await Product.find().populate("store_id");
    return NextResponse.json({ data: products_all }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
