import React from "react";
import Applications from "./statusCards/applications";
import Enrollments from "./statusCards/enrollments";
import Financial from "./statusCards/financial";
import Tasks from "./statusCards/tasks";

const status = () => {
  return (
    <section className="flex flex-wrap gap-5 mb-8">
      <Applications />
      <Enrollments />
      <Financial />
      <Tasks />
    </section>
  );
};

export default status;
