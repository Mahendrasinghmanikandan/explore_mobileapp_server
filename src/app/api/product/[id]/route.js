import { createDBConnection } from "@/db/conn";
import { NextResponse } from "next/server";
import product from "../../../../model/products.model";
import _ from "lodash";

export const GET = async (request, { params }) => {
  try {
    createDBConnection();
    let { search, catagory, district } = JSON.parse(params.id);
    let where = {};
    if (catagory !== "All") {
      where.product_category = catagory;
    }
    console.log(district);
    const data = await product
      .find({
        $or: [{ product_name: new RegExp(search, "i") }],
        $and: [where],
      })
      .populate("store_id");
    let newData = null;
    if (district !== "All") {
      newData = data.filter((res) => {
        return res.store_id.store_district === district;
      });
    }

    return NextResponse.json({ data: newData || data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    createDBConnection();
    await product.findByIdAndDelete({ _id: params.id });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const PUT = async (request, { params }) => {
  try {
    createDBConnection();
    let formData = await request.json();
    await product.findByIdAndUpdate({ _id: params.id }, formData);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
