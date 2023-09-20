import { NextResponse } from "next/server";
import Store from "../../../../model/store.models";
import { cookies } from "next/headers";
import { createDBConnection } from "@/db/conn";

export const GET = async () => {
  try {
    let user_id = cookies().get("incomming_user").value;
    const data = await Store.find({ user_id: user_id });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    createDBConnection();
    let formData = await request.json();
    let user_id = cookies().get("incomming_user").value;
    let store_id = await Store.find({ user_id: user_id });
    await Store.findByIdAndUpdate({ _id: store_id[0]._id }, formData);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
