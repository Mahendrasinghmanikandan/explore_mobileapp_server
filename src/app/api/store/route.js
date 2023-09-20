import { NextResponse } from "next/server";
import Store from "../../../model/store.models";
import User from "../../../model/user.model";
import { cookies } from "next/headers";
import { createDBConnection } from "@/db/conn";
import _ from "lodash";

export const POST = async (request) => {
  try {
    createDBConnection();
    const data = await request.json();
    let id = cookies().get("incomming_user").value;
    data.user_id = id;

    await Store.create(data);
    await User.findByIdAndUpdate({ _id: id }, { $set: { storeStatus: true } });
    const userData = await User.find({ _id: id });

    return NextResponse.json(
      {
        message: "store created",
        data: {
          storeStatus: _.get(userData, "[0].storeStatus", ""),
        },
      },
      { status: 200 }
    );
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
    await createDBConnection();
    const stores = await Store.find().populate("user_id", {
      password: 0,
    });
    return NextResponse.json({ data: stores }, { status: 200 });
    
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};


