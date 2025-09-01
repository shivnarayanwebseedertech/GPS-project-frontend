import React from "react";
import PageHeader from "../components/PageHeader";

const Settings = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Configure system preferences and options"
        backTo="/dashboard"
        showBackButton={false }
      />
    </div>
  );
};

export default Settings;
