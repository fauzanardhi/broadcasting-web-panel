import SignInForm from "@/components/Auth/SignInForm";
import { Modal } from "@/components/Layout/Modal";
import React from "react";

export default function LoginModal() {
  return (
    <>
      <Modal>
        <SignInForm />
      </Modal>
    </>
  );
}
