import { createDBConnection } from "@/db/conn";
import Production from "@/model/production";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await createDBConnection();
    const url = await Production.find();
    return NextResponse.json({ message: url }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
};
