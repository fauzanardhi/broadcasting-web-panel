"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { redirect } from "next/navigation";

const Modal = ({ show = true, children, className }) => {
  return (
    React.createElement(Transition, { appear: true, show: show, as: Fragment }, 
      React.createElement(Dialog, { as: "div", className: `relative`, onClose: () => {} }, 
        React.createElement(Transition.Child, {
          as: Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0"
        }, 
          React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25" })
        ), 

        React.createElement("div", { className: "fixed inset-0 overflow-y-auto" }, 
          React.createElement("div", { className: "flex min-h-full items-center justify-center  text-center" }, 
            React.createElement(Transition.Child, {
              as: Fragment,
              enter: "ease-out duration-300",
              enterFrom: "opacity-0 scale-95",
              enterTo: "opacity-100 scale-100",
              leave: "ease-in duration-200",
              leaveFrom: "opacity-100 scale-100",
              leaveTo: "opacity-0 scale-95"
            }, 
              React.createElement(Dialog.Panel, {
                className: `w1/2 mx-5 ${className}   rounded-md overflow-hidden  bg-white   text-left align-middle shadow-xl transition-all`
              }, 
                children
              )
            )
          )
        )
      )
    )
  );
};

export { Modal };
