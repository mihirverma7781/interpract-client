import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <aside>Sidebar</aside>
      <section>
        <header>Header</header>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default DashboardLayout;
