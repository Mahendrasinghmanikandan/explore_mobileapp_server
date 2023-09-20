import { NextResponse } from "next/server";
import Store from "../../../../model/store.models";
import { createDBConnection } from "@/db/conn";

export const GET = async (_, { params }) => {
  try {
    await createDBConnection();
    const stores = await Store.find({
      $or: [
        { store_name: new RegExp(params.id, "i") },
        { store_district: new RegExp(params.id, "i") },
        { store_local_landmark: new RegExp(params.id, "i") },
      ],
    }).populate("user_id", {
      password: 0,
    });
    return NextResponse.json({ data: stores }, { status: 200 });
  } catch (err) {
    return NextRequest.json(
      { message: "Something Went wrong" },
      { status: 500 }
    );
  }
};
