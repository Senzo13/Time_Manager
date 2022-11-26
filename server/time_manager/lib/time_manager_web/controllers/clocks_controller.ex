defmodule TimeManagerWeb.ClocksController do
  use TimeManagerWeb, :controller
  alias TimeManager.Hours
  alias TimeManager.Hours.Clocks

  action_fallback TimeManagerWeb.FallbackController

  def create(conn, %{"user_id" => user_id, "clocks" => clocks_params}) do
    with {:ok, %Clocks{} = clocks} <- Hours.create_clocks(Map.put(clocks_params, "user", user_id)) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clocks_path(conn, :show, clocks))
      |> render("show.json", clocks: clocks)
    end
  end
  
  def show(conn, %{"user_id" => user_id}) do
    clocks = Hours.get_clocks_with_userId(user_id)
    render(conn, "showmany.json", clocks: clocks)
  end
end