import { NextResponse } from "next/server";
import User from "../../../../model/user.model";
import { createDBConnection } from "@/db/conn";
import { cookies } from "next/headers";

export const PUT = async (request) => {
  try {
    createDBConnection();
    let formData = await request.json();
    let id = cookies().get("incomming_user").value;
    await User.findByIdAndUpdate({ _id: id }, formData );
    return NextResponse.json(
      { message: "success" },
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
