import { createDBConnection } from "@/db/conn";
import User from "@/model/user.model";
import { NextResponse } from "next/server";
import _ from "lodash";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const POST = async (request) => {
  createDBConnection();
  try {
    const formData = await request.json();
    formData.password = await bcrypt.hash(formData.password, 10);
    const check_email = await User.find({ email: formData.email });
    if (!_.isEmpty(check_email)) {
      return NextResponse.json(
        { message: "Email Already Used" },
        { status: 200 }
      );
    }
    await User.create(formData);
    return NextResponse.json(
      { message: "user successfully registered" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    const { email, password } = await request.json();
    const verify = await User.find({ email: email });
    if (_.isEmpty(verify)) {
      return NextResponse.json(
        { message: "The email you entered is not linked to this application" },
        { status: 200 }
      );
    }
    const verifyPassword = await bcrypt.compare(
      password,
      _.get(verify, "[0].password", "")
    );
    if (!verifyPassword) {
      return NextResponse.json(
        { message: "The password you entered is incorrect" },
        { status: 200 }
      );
    }

    cookies().set("incomming_user", _.get(verify, "[0]._id", ""));
    return NextResponse.json(
      {
        data: {
          url: _.get(verify, "[0].pic", ""),
          storestatus: _.get(verify, "[0].storeStatus", ""),
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
    let user_id = cookies().get("incomming_user").value;
    const data = await User.find({ _id: user_id }, { password: 0 });
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
