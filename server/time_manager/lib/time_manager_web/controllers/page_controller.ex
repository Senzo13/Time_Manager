defmodule TimeManagerWeb.PageController do
  use TimeManagerWeb, :controller

  def protected(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    render(conn, "protected.html", current_user: user)
  end

  def index(conn, _params) do
    render(conn, "index.html")
  end
end