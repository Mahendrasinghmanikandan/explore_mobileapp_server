import { createDBConnection } from "@/db/conn";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import _ from "lodash";
import User from "../../../model/user.model";

export const GET = async (request) => {
  createDBConnection();
  try {
    let checkToken = cookies().get("incomming_user");
    if (_.get(checkToken, "value", "") === "") {
      return NextResponse.json({ message: "Login" }, { status: 200 });
    } else {
      const url = await User.find({ _id: checkToken.value });

      return NextResponse.json(
        {
          message: _.isEmpty(url) ? "Login" : "Dashboard",
          data: {
            url: _.get(url, "[0].pic", ""),
            storeStatus: _.get(url, "[0].storeStatus", ""),
          },
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async () => {
  try {
    createDBConnection();
    cookies().delete("incomming_user");
    return NextResponse.json(
      { message: "success" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
