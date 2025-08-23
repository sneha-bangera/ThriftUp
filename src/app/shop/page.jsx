import Shop from "./ShopClient";
import React,  { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-hot-pink">Loading...</div>}>
      <Shop />
    </Suspense>
  );
}
