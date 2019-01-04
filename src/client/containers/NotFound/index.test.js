import React from "react";

import { create } from "react-test-renderer";
import NotFound from "../NotFound";

test("snapshot", () => {
  const c = create(<NotFound />);
  expect(c.toJSON()).toMatchSnapshot();
});
