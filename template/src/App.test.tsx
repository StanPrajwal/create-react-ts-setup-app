import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { routerFuture } from "./routes/routerFuture";

const renderAt = (path: string) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]} future={routerFuture}>
        <App />
      </MemoryRouter>
    </Provider>
  );

test("renders the home page", async () => {
  renderAt("/");
  expect(await screen.findByAltText("home")).toBeInTheDocument();
});

test("renders the 403 page", async () => {
  renderAt("/errorPage403");
  expect(await screen.findByText("Error 403")).toBeInTheDocument();
});
