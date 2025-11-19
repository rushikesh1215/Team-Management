"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import React from "react";


const UserLoading = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();

  if (!isLoaded || !isUserLoaded) {
    return <h1 className=" flex justify-center text-4xl ">Loading</h1>;
  } else <></>;
};

export default UserLoading;
