import SignOut from "@/components/Auth/SignOut";
import { Modal } from "@/components/Layout/Modal";
import getUserSession from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

function SignOutPage() {
  return (
    <Modal>
      <SignOut />
    </Modal>
  );
}

export default SignOutPage;
