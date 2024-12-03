import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const DashboardWrapper: React.FC<Props> = ({ children }) => {
    return <div className="light flex bg-gray-50 text-gray-900 w-full min-h-screen">Sidebar
    <main className="flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-24">{children}</main>
    </div>;
};

export default DashboardWrapper;
