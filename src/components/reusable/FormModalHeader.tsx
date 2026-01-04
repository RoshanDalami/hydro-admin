import React from "react";

function FormModalHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
}

export default FormModalHeader;
